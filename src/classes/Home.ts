import Blind from "./Blind";
import PinBoardDtos from "./PinBoardDto";
import HotBoardDtos from "./HotBoardDto";

export default interface Home {
  expiredAt: number;
  nickname: string,
  blacklistId: number,
  blind: Blind[],
  pinBoardDtos: PinBoardDtos[],
  hotBoardDto: HotBoardDtos[],
  }