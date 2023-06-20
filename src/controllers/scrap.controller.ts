import { Request, Response } from "express"
import { scrapService } from "../services/scrab.service";
import { User } from "../entity/User";

const create = async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) return res.render('scraps/scraps', { message: 'La url no esta presente'});
  try {
    await scrapService.create(url, req.user as User);
    return res.redirect('/scraps');
  } catch (error) {
    return res.render('home', { message: error });
  }
}

const findAll = async (req: Request, res: Response) => {
  let { page } = req.query;
  const pageNum = !page ? 1: Number(page);
  try {
    const { scraps, total, totalPages} = await scrapService.findAll(req.user as User, pageNum);
    return res.render('scraps/scraps', { scraps, total, totalPages, currentPage: pageNum })
  } catch (error) {
    return res.render('home', { message: error});
  }
}

const show = async (req:Request, res: Response) => {
  const { scrapId } = req.params
  try {
    const scrap = await scrapService.findOne(Number(scrapId));
    return res.render('scraps/show', { scrap});
  } catch (error) {
    return res.render('home', { message: error});
  }
}

export const scrapController = {
  create,
  findAll,
  show
}