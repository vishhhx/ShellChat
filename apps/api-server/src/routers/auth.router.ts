import { Router } from "express";

import {registerUser} from "../controllers/auth.controller" 
export const router:Router = Router();
router.post("/register",registerUser);