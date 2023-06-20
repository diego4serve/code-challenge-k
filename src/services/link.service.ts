import * as cheerio from "cheerio";
import { Scrap } from "../entity/Scrap";
import { Link } from "../entity/Link";
import { AppDataSource } from "../data-source";
import { ScrapStatus } from "../constants/scrap.constants";

const batch = async (scrap: Scrap) => {
  const linkRepository = AppDataSource.getRepository(Link);
  const scrapRespository = AppDataSource.getRepository(Scrap);
  const res = await fetch(scrap.url);
  const html = await res.text();
  const $ = cheerio.load(html);
  const links = $('a');

  const promises = links.map((index, link) => {
    const newLink = new Link();
    newLink.name = $(link).text() || $(link).html() || ''
    newLink.url = $(link).attr('href') || '';
    newLink.scrap = scrap;
    return linkRepository.manager.save(newLink)
  });

  await Promise.all(promises);
  await scrapRespository.update({ id: scrap.id }, { status: ScrapStatus.Completed });
};

export const linkService = {
  batch,
};
