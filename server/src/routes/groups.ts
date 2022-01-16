import { Router } from "express";
import { GroupsController } from "../controllers/groups";

const router = Router();

router.get("/join/:id", (req, res) => GroupsController.join(req, res));

export default router;