import React, { useEffect, useState } from "react";
import "../component/quizz.css";
import background from "../../src/image/start1.png";


const StartButton = ({ onStart }) => {
    return (
      <button onClick={onStart} className="start-button">
        <span>Bắt đầu</span>
      </button>
    );
  };
  
  const Quizz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [endTime, setEndTime] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showHistory, setShowHistory] = useState(false);
    const [showScoreDialog, setShowScoreDialog] = useState(false);
    const questions = [
      {
        Title: "Question 1",
        question: "Thú mỏ vịt thuộc loài nào",
        options: ["Lưỡng cư", "Động vật có vú", "Bò sát", "Ngậm nhắm"],
        correctAnswer: 1,
        showAnswer:"Động vật có vú",
      },
      {
        Title: "Question 2",
        question: "Đâu là một loại hình chợ tạm tự phát thường xuất hiện trong các khu dân cư?",
        options: [" Ếch", "Cóc", "Thằn lằn", " Nhái"],
        correctAnswer: 1,
        showAnswer:"Cóc",
      },
      {
        Title: "Question 3",
        question: "Đâu là tên một bãi biển ở Quảng Bình?",
        options: ["Đá Lăn", "Đá Chạy", "Đá Nhảy", "Đá Bò"],
        correctAnswer: 2,
        showAnswer:"Đá Nhảy",
      },
      {
        Title: "Question 4",
        question: "Haiku là thể thơ truyền thống của nước nào?",
        options: ["Nhật Bản", " Mông Cổ", "Trung Quốc", "Hàn Quốc"],
        correctAnswer: 0,
        showAnswer:"Nhật Bản",
      },
      {
        Title: "Question 5",
        question: "Đâu là tên một loại bánh Huế?",
        options: ["Khoái", "Sướng", "Thích ", " Vui"],
        correctAnswer: 0,
        showAnswer:"Khoái",
      },
      {
        Title: "Question 6",
        question: "Tượng đài Chiến thắng Điện Biên Phủ được dựng trên ngọn đồi nào?",
        options: ["C1", "A1", "E1", "D1"],
        correctAnswer: 3,
        showAnswer:"D1",
      },
      {
        Title: "Question 7",
        question: "Màu chủ đạo của tờ tiền Polymer mệnh giá 500.000 đồng là gì?",
        options: ["Đỏ", "Vàng", "Xanh", "Tím"],
        correctAnswer: 2,
        showAnswer:"Xanh",
      },
      {
        Title: "Question 8",
        question: "Bảo tàng Hồ Chí Minh được thiết kế theo dáng một loài hoa nào?",
        options: ["Hoa sen ", "Hoa hướng dương", "Hoa hồng", "Hoa đào"],
        correctAnswer: 0,
        showAnswer:"Hoa sen",
      },
      {
        Title: "Question 9",
        question: "Tháng âm lịch nào còn được gọi là Tháng cô hồn?",
        options: ["Tháng tám", " Tháng chín", "Tháng bảy", "Tháng mười"],
        correctAnswer: 2,
        showAnswer:"Tháng bảy",
      },
      {
        Title: "Question 10",
        question: "Câu nào chỉ tình cảnh đơn độc, yếu thế không có chỗ dựa?",
        options: ["Thân tàn ma dại", "Thân cô thế cô", "Thân lừa ưa nặng", " Thân làm tội đời"],
        correctAnswer: 1,
        showAnswer:"Thân cô thế cô",
      },
    
     
    ];
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${formattedMinutes}:${formattedSeconds}`;
    };
  
    const handleStartQuiz = () => {
      setCurrentQuestion(0);
      setSelectedOptions([]);
      setScore(0);
      setTimeElapsed(0);
      setEndTime(null);
      setShowScoreDialog(false);
    };
  
    const handleOptionSelect = (optionIndex) => {
      const updatedOptions = [...selectedOptions];
      updatedOptions[currentQuestion] = optionIndex;
      setSelectedOptions(updatedOptions);
    };
    const isLastQuestion = currentQuestion === questions.length - 1;
    const handleNextQuestion = () => {
      if (selectedOptions[currentQuestion] == questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    
      if (currentQuestion == questions.length - 1) {
        handleFinishQuiz();

      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    };
    useEffect(() => {
      const timer = setInterval(() => {
        const currentTime = endTime ? endTime : Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Đổi sang giây
    
        setTimeElapsed(elapsedTime);
      }, 1000);
    
      return () => {
        clearInterval(timer);
      };
    }, [startTime, endTime]);
  
   
    
    const handlePreviousQuestion = () => {
      setCurrentQuestion(currentQuestion - 1);
    };
    const passingScore = 5;
    
    const handleFinishQuiz = () => {
      setShowScoreDialog(true);
      setEndTime(Date.now());
    };
    const handleAgain = () => {
      setShowScoreDialog(false);
      handleStartQuiz();
    };
    const handleCloseScoreDialog = () => {
      setShowScoreDialog(false);
      setCurrentQuestion(null);
      window.location.reload();
      setShowScoreDialog(false);
    };
    const handleCloseHistory = () => {
      setShowHistory(false);
    };
    const handleShowHistory = () => {
      setShowHistory(true);
    };
  
    if (currentQuestion === null) {
      return (
        <div className="quiz-app">
          <div className="start-container">
            <img src={background} alt="Background" className="background-image" />
            <StartButton onStart={handleStartQuiz} />
          </div>
        </div>
      );
    }
  

    if (showScoreDialog) {
      const formattedTime = formatTime(timeElapsed);
      return (
        <div className="quiz-app">
          {showHistory ? (
           <div className="history-container">
           <h1>Lịch Sử Trả Lời</h1>
           {questions.map((question, index) => (
             <div key={index} className="question-container">
               <h2>Câu hỏi {index + 1}</h2>
               <p>Đáp án đúng: {question.showAnswer}</p>
               <p>Đáp án của bạn: {question.options[selectedOptions[index]]}</p>
             </div>
           ))}
           <button onClick={handleCloseHistory} className="close-button">
              <span className="close-icon">X</span>
            </button>
         </div>
          ) : (
            <div className="result-container">
                  <h1>Quiz Result</h1>
                  <p>Điểm: {score + 1}/{questions.length} </p>
                  <p>Thời gian: {formattedTime}</p>
                  <div className={"result-message"}>
                    {score >= passingScore ? (
                      <i className="icon bx bx-happy-heart-eyes"></i>
                    ) : (
                      <i className="icon bx bx-dizzy"></i>
                    )}
                    <p>
                      {score >= passingScore
                        ? 'Chúc mừng! Bạn đã vượt qua bài kiểm tra.'
                        : 'Bạn chưa đạt điểm đủ để vượt qua bài kiểm tra.'}
                    </p>
                  </div>
                  <button onClick={handleCloseScoreDialog}>Close</button>
                  <button onClick={handleAgain}>Làm Lại</button>
                  <button onClick={handleShowHistory}>Xem Lịch Sử</button>
                </div>
          )}
        </div>
      );
    }
    return (
      <div className="quiz-app">
        <div className="question-container">
          <h1>{questions[currentQuestion].Title}/{questions.length}</h1>
          <p>{questions[currentQuestion].question}</p>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`option ${selectedOptions[currentQuestion] === index ? "selected" : ""}`}
              >
                {option}
              
              </button>
            ))}
          </div>
          {isLastQuestion && (
            <div>
              <button
            onClick={handlePreviousQuestion}
            className={`previous-button ${currentQuestion === 0 ? 'disabled' : ''}`}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
        <button onClick={handleFinishQuiz} className="finish-button">
          Finish
        </button>
        </div>
      )}
      {!isLastQuestion && (
       <div>
         <button
          onClick={handleNextQuestion}
          className="next-button"
          disabled={selectedOptions[currentQuestion] === undefined}
        >
          Next
        </button>
         <button
            onClick={handlePreviousQuestion}
            className={`previous-button ${currentQuestion === 0 ? 'disabled' : ''}`}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
        </div>
      )}
        </div>
      </div>
    );
  };
  
  export default Quizz;
