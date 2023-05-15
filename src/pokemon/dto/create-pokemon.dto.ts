import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
    
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    no: number;

    @IsString()
    @IsNotEmpty()
    name: string;

}
