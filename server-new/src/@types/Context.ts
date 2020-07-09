import { Request, Response } from 'express'

export default interface Context {
	req: Request
	res: Response
}
