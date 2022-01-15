import Blind from "./Blind";
import PinBoardDto from "./PinBoardDto";
import HotBoardDto from "./HotBoardDto";

export default interface Home {
  expiredAt: Number;
  nickname: String,
  blacklistId: Number,
  blind: Blind[],
  pinBoardDto: PinBoardDto[],
  hotBoardDto: HotBoardDto[],
  }