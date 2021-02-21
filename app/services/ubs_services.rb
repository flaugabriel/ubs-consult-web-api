class UbsServices
  require "open-uri"
  require "csv"

  def self.csv_import(geocodes, page, per_page)
    url = "http://repositorio.dados.gov.br/saude/unidades-saude/unidade-basica-saude/ubs.csv"

    begin
      file = URI.open(url)
      csv_parse = CSV.parse(file.read.force_encoding("UTF-8"), headers: true)
      data_collections = []
      perimeter_colections = []

      csv_parse.each_with_index do |value, index|
        id = index + +1
        serialize = make_colection(value, id)
        data_collections.push(serialize)
      end

      collections = data_collections.select { |index| index[:geocode][:lat]  <= geocodes.first.to_f  && index[:geocode][:long] >= geocodes.last.to_f }

      collections.each do |collection|
        distance = Geocoder::Calculations.distance_between([collection[:geocode][:lat],collection[:geocode][:long]], [geocodes.first.to_f,geocodes.last.to_f])

        if distance <= 15.0
          perimeter_colections.push(collection)
        end
      end
    rescue => e
      return data = { error: e }
    else
      return response_messages(perimeter_colections, page, per_page, csv_parse.length)
    end
  end

  def self.make_colection(value, id)
    data = {
      id: id,
      name: value["nom_estab"],
      address: "#{value['dsc_bairro']} - #{value["dsc_endereco"]}",
      city: value["dsc_cidade"],
      phone: value["dsc_telefone"],
      geocode: {
        lat: value["vlr_latitude"].to_f,
        long: value["vlr_longitude"].to_f,
      },
      scores: {
        size_ambience: value["dsc_estrut_fisic_ambiencia"],
        adaptation_for_seniors: value["dsc_adap_defic_fisic_idosos"],
        medical_equipment: value["dsc_equipamentos"],
        medicine: value["dsc_medicamentos"],
      },
    }
    data
  end

  def self.response_messages(perimeter_colections, page, per_page, csv_parse_length)
    data = {
      current_page: page,
      per_page: per_page,
      total_entries: csv_parse_length,
      entries: perimeter_colections[0...per_page],
    }
    data
  end
end
