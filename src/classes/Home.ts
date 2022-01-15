import Blinds from "./Blinds";
import PinBoardDtos from "./PinBoardDtos";
import HotBoardDtos from "./HotBoardDtos";

export default interface Home {
  expiredAt: Number;
  nickname: String,
  blacklistId: Number,
  blinds: Blinds,
  pinBoardDtos: PinBoardDtos,
  hotBoardDtos: HotBoardDtos,
  }