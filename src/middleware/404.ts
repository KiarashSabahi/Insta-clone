import {Request, Response} from "express";

export const pageNotFound = (req: Request, res: Response) => {
    res.status(200).render("404", {pageTitle: "Page Not Found", requestedURL: req.originalUrl});
}