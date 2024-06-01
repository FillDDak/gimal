var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/join", async function (req, res) {
  try {
    const { id, password, confirmPassword } = req.body;

    console.log('회원가입 요청:', req.body);  // 요청 내용 로그

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

    console.log('로그인 요청:', req.body);

    const checkUser = await sequelize.models.user.findOne({
      where: { id, password }
    });

    if (!checkUser) {
      return res.status(400).json({
        result: "fail",
        message: "아이디 또는 패스워드가 틀렸습니다."
      });
    }

    req.session.user = checkUser;
    console.log('세션 저장 전:', req.session);

    req.session.save(err => {
      if (err) {
        console.error('세션 저장 오류:', err);
        return res.status(500).json({
          result: "error",
          message: "세션 저장 중 오류가 발생했습니다."
        });
      }

      console.log('세션 저장 후:', req.session);

      res.json({
        result: "success",
        user: checkUser
      });
    });

  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json({
      result: "error",
      message: "서버 오류가 발생했습니다."
    });
  }
});

router.post("/info", async function (req, res) {
  console.log('세션 확인 요청:', req.session); // 세션 확인 로그
  if (req.session.user) { // 세션에 사용자 정보가 있을 때 -> 로그인 상태
    res.json({
      result: "success",
      user: req.session.user
    });
  } else { // 세션에 사용자 정보가 없을 때 -> 로그아웃 상태
    res.json({
      result: "fail"
    });
  }
});
router.post("/logout", async function (req, res) {
  req.session.destroy()
  res.json({
    result: "success"
  })
})

module.exports = router;
