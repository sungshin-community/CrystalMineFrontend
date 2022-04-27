import Blind from "./Blind";
import PinBoardDto from "./PinBoardDto";
import HotBoardDto from "./HotBoardDto";

export default interface Home {
  expireIn: number;
  nickname: string,
  blacklistId: number,
  blinds: Blind[],
  pinBoardDtos: PinBoardDto[],
  hotBoardDto: HotBoardDto,
  }