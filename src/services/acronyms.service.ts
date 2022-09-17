import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { HttpException } from '@exceptions/HttpException';
import { Acronym } from '@interfaces/acronyms.interface';
import acronymModel from '@models/acronyms.model';
import { isEmpty } from '@utils/util';

// const myAcronymPath = './src/config/myAcronym.json';

class AcronymService {
  public acronymsData = acronymModel;

  public async findAllAcronym(from: number, limit: number, search: string): Promise<Acronym> {
    const searchAcronyms: Acronym = await this.acronymsData
      .findOne({ name: search })
      .skip(from - 1)
      .limit(limit);
    if (!searchAcronyms) throw new HttpException(409, "Acronym doesn't exist");

    // const acronyms: Acronym[] = searchAcronyms.slice(from - 1, from + limit - 1);
    // await this.acronymsData.insertMany(JSON.parse(fs.readFileSync(myAcronymPath, 'utf-8').toString()));
    // const acronyms: Acronym[] = await this.acronymsData.find();
    return searchAcronyms;
  }

  public async createAcronym(acronymData: CreateAcronymDto): Promise<Acronym> {
    if (isEmpty(acronymData)) throw new HttpException(400, 'acronymData is empty');

    const findAcronym: Acronym = await this.acronymsData.findOne({ name: acronymData.name });
    if (findAcronym) throw new HttpException(409, `This acronym ${acronymData.name} already exists`);

    const createAcronymData: Acronym = await this.acronymsData.create({ ...acronymData });

    return createAcronymData;
  }

  public async updateAcronym(_id: string, acronymData: CreateAcronymDto): Promise<Acronym> {
    if (isEmpty(acronymData)) throw new HttpException(400, 'acronymData is empty');

    if (acronymData.name) {
      const findAcronym: Acronym = await this.acronymsData.findOne({ name: acronymData.name });
      if (findAcronym && findAcronym._id != _id) throw new HttpException(409, `This acronym ${acronymData.name} already exists`);
    }

    const updateAcronymData: Acronym = await this.acronymsData.findByIdAndUpdate(_id, { ...acronymData });
    if (!updateAcronymData) throw new HttpException(409, "Acronym doesn't exist");

    return updateAcronymData;
  }

  public async deleteAcronym(_id: string): Promise<Acronym> {
    const deleteAcronymData: Acronym = await this.acronymsData.findByIdAndDelete(_id);
    if (!deleteAcronymData) throw new HttpException(409, "Acronym doesn't exist");
    return deleteAcronymData;
  }
}

export default AcronymService;
