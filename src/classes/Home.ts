import Blind from "./Blind";
import PinBoardDtos from "./PinBoardDto";
import HotBoardDto from "./HotBoardDto";

export default interface Home {
  expiredAt: number;
  nickname: string,
  blacklistId: number,
  blind: Blind[],
  pinBoardDtos: PinBoardDtos[],
  hotBoardDtos: HotBoardDto[],
  }