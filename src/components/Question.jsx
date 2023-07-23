import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useForm, Controller } from "react-hook-form";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  answersAtom,
  currentQuestionAtom,
  showResultSelector,
} from "../utils/recoil_state";
import { downloadImage } from "../utils/database-operation";
import { toBase64 } from "../utils/helpers";

const Question = ({ question, handleShowModal, questionLength }) => {
  const setCurrentQuestion = useSetRecoilState(currentQuestionAtom);
  const showResult = useRecoilValue(showResultSelector(questionLength));
  const [imageBase64, setImageBase64] = useState(null);
  // const setScore = useSetRecoilState(quizScoreAtom);

  const options = question.options;

  const setAnswers = useSetRecoilState(answersAtom);

  const { control, getValues, watch } = useForm({
    defaultValues: { options },
  });

  const storeAnswer = () => {
    const targetOptionId = getValues("options.target");

    const targetOption = options.find((option) => {
      return option.id === targetOptionId;
    });

    setAnswers((prev) => [...prev, targetOption]);
  };

  const handleNextQuestion = () => {
    storeAnswer();

    if (showResult) {
      handleShowModal();
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (question.image) {
        const { image } = await downloadImage(question.image);
        setImageBase64(await toBase64(image));
      }
    };
    getImage();
  }, [question]);

  return (
    <div className=" w-75 m-auto mt-5">
      <Card
        border="light"
        className="question__card rounded-5 mt-5"
      >
        <Card.Body>
          <div className="d-flex flex-column align-items-center mb-5">
            {question.image && (
              <img
                src={imageBase64}
                alt=""
                style={{ width: "80px" }}
                className="rounded mb-3"
              />
            )}
            <h5>{question.content}</h5>
          </div>
          <Row>
            <ButtonGroup className="play-quiz__options d-flex row g-3 justify-content-start">
              {options.map((option, idx) => (
                <Controller
                  control={control}
                  name={`options.target`}
                  key={option.id}
                  render={({ field: { onChange, value } }) => (
                    <ToggleButton
                      type="radio"
                      id={`radio-${idx}`}
                      value={option.id}
                      checked={value === option.id}
                      onChange={(e) => onChange(e.target.value)}
                      className="col-5 mb-2 rounded-5 max btn-options"
                    >
                      {option.content}
                    </ToggleButton>
                  )}
                />
              ))}
            </ButtonGroup>
          </Row>
        </Card.Body>
      </Card>
      <Button
        onClick={handleNextQuestion}
        disabled={watch("options.target") ? false : true}
        className="d-block ms-auto mt-3 bg-gradient"
      >
        Next
      </Button>
    </div>
  );
};

export default Question;
