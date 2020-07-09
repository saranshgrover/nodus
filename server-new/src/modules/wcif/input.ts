import { Field, InputType, ID } from 'type-graphql'
import { MaxLength, MinLength } from 'class-validator'
import { Wcif } from '../../entities/wcif'

@InputType()
export class NewWcifInput extends Wcif {}
