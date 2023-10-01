import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PostUserDto {
  @ApiProperty({
    required: true,
    example: 'user1@naver.com',
    description: '유저 이메일',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '1234',
    description: '비밀번호',
  })
  @IsNotEmpty()
  password: string;
}
