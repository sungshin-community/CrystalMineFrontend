import Blind from "./Blind";
import PinBoardDto from "./PinBoardDto";
import HotBoardDto from "./HotBoardDto";

export default interface Home {
  expiredAt: number;
  nickname: string,
  blacklistId: number,
  blind: Blind[],
  pinBoardDtos: PinBoardDto[],
  hotBoardDtos: HotBoardDto[],
  }