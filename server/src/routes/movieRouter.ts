import { Router } from "express";
import MoviesController from "../controllers/movieController";

const router = Router();

router.get("/", (req, res) => MoviesController.GetMovies(req, res));
router.get("/top", (req, res) => MoviesController.GetTopMovies(req, res));


export default router;
