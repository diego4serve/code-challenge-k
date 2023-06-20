import { validate } from "class-validator";
import { ITEMS_PER_PAGE, ScrapStatus } from "../constants/scrap.constants";
import { AppDataSource } from "../data-source"
import { Scrap } from "../entity/Scrap"
import * as cheerio from 'cheerio';
import { User } from "../entity/User";
import { linkService } from "./link.service";
import { plainToClass } from "class-transformer";


const create = async (url: string, user: User) => {
  const scrapRespository = AppDataSource.getRepository(Scrap);
  const newScrap = new Scrap();
  newScrap.url = url;
  newScrap.name = await getPageName(url);
  newScrap.status = ScrapStatus.Pending;
  newScrap.user = user;

  const errors = await validate(newScrap)
  if (errors.length > 0) throw new Error('Error con URL suministrada')

  const savedScrap = await scrapRespository.manager.save(newScrap)
  linkService.batch(savedScrap)
  return plainToClass(Scrap, savedScrap)
}

const findAll = async (user: User, page = 1) => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const scrapRepository = AppDataSource.getRepository(Scrap);
  const [scraps, total] = await scrapRepository.findAndCount({
    skip,
    take: ITEMS_PER_PAGE,
    where: { user }
  })
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return {
    scraps,
    total,
    totalPages
  };
}

const findOne = async (scrapId: number) => {
  const scrapRepository = AppDataSource.getRepository(Scrap);
  return await scrapRepository.findOneBy({ id: scrapId});
}

const getPageName = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  const name = $('head > title').text()
  return name
}

export const scrapService = {
  create,
  findAll,
  findOne
}