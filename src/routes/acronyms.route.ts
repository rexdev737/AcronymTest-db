import { Router } from 'express';
import AcronymsController from '@controllers/acronyms.controller';
import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AcronymsRoute implements Routes {
  public path = '/acronyms';
  public router = Router();
  public acronymsController = new AcronymsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.acronymsController.getAcronyms);
    this.router.post(`${this.path}`, validationMiddleware(CreateAcronymDto, 'body'), this.acronymsController.createAcronym);
    this.router.put(`${this.path}/:_id`, validationMiddleware(CreateAcronymDto, 'body', true), this.acronymsController.updateAcronym);
    this.router.delete(`${this.path}/:_id`, this.acronymsController.deleteAcronym);
  }
}

export default AcronymsRoute;
