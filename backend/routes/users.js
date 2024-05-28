var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/join", async function (req, res) {
  try {
    const { id, password, confirmPassword } = req.body;

    // 필드 검증
    if (!id || !password || !confirmPassword) {
      return res.status(400).json({
        result: "fail",
        message: "모든 필드를 입력해주세요."
      });
    }

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      return res.status(400).json({
        result: "fail",
        message: "비밀번호가 일치하지 않습니다."
      });
    }

    const checkUser = await sequelize.models.user.findOne({
      where: { id }
    });

    if (checkUser) {    // 이미 가입된 아이디가 있으면
      return res.status(400).json({
        result: "fail",
        message: "이미 가입된 아이디입니다."
      });
    }

    await sequelize.models.user.create({ id, password });
    res.json({ result: "success" });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "error",
      message: "서버 오류가 발생했습니다."
    });
  }
});

router.post("/login", async function (req, res) {
  try {
    const { id, password } = req.body;

    console.log('로그인 요청:', req.body);  // 요청 내용 로그

    const checkUser = await sequelize.models.user.findOne({
      where: { id, password }
    });

    if (!checkUser) { // 로그인 실패 -> 아이디 또는 패스워드가 틀림
      console.log('로그인 실패: 아이디 또는 패스워드가 틀렸습니다.');
      return res.status(400).json({
        result: "fail",
        message: "아이디 또는 패스워드가 틀렸습니다."
      });
    }

    // TODO : 세션에 로그인 정보 저장
    res.json({ result: "success" });

  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json({
      result: "error",
      message: "서버 오류가 발생했습니다."
    });
  }
});


module.exports = router;
