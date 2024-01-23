/*
Router for Tilda
 */

import express from 'express';
import controller from "./TildaController" ;

const router = express.Router();

/**
 * @openapi
 * info:
 *   title: Webhook API for Tilda
 *   description: API to receive webhooks from Tilda platform
 *   version: 1.0.0
 * paths:
 *   /webhook/:
 *     post:
 *       tags:
 *          - Tilda endpoint
 *       summary: Receive webhook data to fill the database with random records
 *       description: Fill database with fake random data
 *
 */
router.post('/fill', controller.tildaWebhook);