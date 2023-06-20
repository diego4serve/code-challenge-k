import { Request, Response } from "express"

const index = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.redirect('/scraps');
  }

  return res.render('login');
}

export const homeController = {
  index
}