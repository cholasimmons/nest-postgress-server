import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty } from "class-validator";

class CreateMarketRequest {
    @IsNotEmpty() name: string;
    @IsNotEmpty() location: string;
}

export {CreateMarketRequest as CreateMarketRequestDto};