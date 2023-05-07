import { useSetRecoilState } from "recoil";
import { quizzesRequestIdAtom } from "../utils/recoil_state";

const useRefectQuizzes = () => {
	const setRequestId = useSetRecoilState(quizzesRequestIdAtom);
	return () => setRequestId((id) => id + 1);
};

export default useRefectQuizzes;
