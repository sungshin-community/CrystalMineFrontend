import TokenDto from './TokenDto';

export default interface SignUpResponseDto {
  id: number;
  username: string;
  nickname: string;
  tokenDto: TokenDto;
}
