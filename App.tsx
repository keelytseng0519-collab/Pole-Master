import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, HardHat, 
  Construction, ArrowUp, ArrowDown, Info, Heart, 
  Zap, Trophy, AlertCircle, Camera, Smartphone, Activity,
  Truck, Search, Tool, ClipboardCheck, MessageSquare, Coffee,
  User, Ghost, Ban, Sunrise, RefreshCw, Check, Moon, Sun, Building, UserCircle, ChevronRight, Eye, MousePointer2, Send
} from 'lucide-react';

const App = () => {
  // --- 玩家資訊與狀態 ---
  const [userInfo, setUserInfo] = useState({ company: '', name: '' });
  const [isRegistered, setIsRegistered] = useState(false);
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); 
  const [isEnvironmentClean, setIsEnvironmentClean] = useState(false);
  const [showSafetyBtn, setShowSafetyBtn] = useState(false);
  const [currentShuffledOptions, setCurrentShuffledOptions] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false); 

  // --- Google 表單設定 (請替換為你的實際 ID) ---
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSegAagkpHeWspykd_5OqqZDQZ6OgTJTAQto38pA9eyN2dCvGA/formResponse";
  const ENTRY_IDS = {
    company: "entry.581240603", 
    name: "entry.1915412366",
    score: "entry.1710980397",
    lives: "entry.1012539758",
    status: "entry.1811303318"
  };

  // 取得稱呼（取名字最後兩個字）
  const nickName = useMemo(() => {
    if (!userInfo.name) return "菜鳥";
    return userInfo.name.length > 2 ? userInfo.name.slice(-2) : userInfo.name.slice(-1);
  }, [userInfo.name]);

  // 選項隨機排序演算法
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // 核心 25 關 SOP 資料
  const rawStagesData = useMemo(() => [
    {
      story: isEnvironmentClean ? `老李：『唷，${nickName}早安啊！睡飽沒？雖然障礙物清掉了，但該穿的還是得穿好，第一步做啥？』` : `老李：『喂！${nickName}，車才剛停好，眼睛在那邊亂看什麼？看帥哥還是看美女？給我滾下車！』`,
      desc: "抵達現場下車後的第一組連動動作是？",
      options: [
        { text: "下車穿反光背心、戴帽，並進行身心狀況自檢。", isCorrect: true, sop: "抵達現場下車穿反光背心、戴帽並自檢。" },
        { text: "趕快去搬梯子，展現積極的效率給學長看。", isCorrect: false, mindset: "莽撞趕工。", failMsg: `老李：『反光背心勒？是想當隱身人啊?』` },
        { text: "先在車上吹個冷氣，滑個短影音等熱氣散掉。", isCorrect: false, mindset: "散漫僥倖。", failMsg: `老李：『你是來上班還是來當大少爺的？給我下去！』` }
      ]
    },
    {
      story: `老李：『${nickName}，這台工程車要是滑溜去撞到路人，你這輩子準備做功德賠人家吧！』`,
      desc: "車輛停妥後的首要安全動作？",
      options: [
        { text: "确實放置輪擋，防止車輛逸走。", isCorrect: true, sop: "車輛停妥後，應先放置輪擋。" },
        { text: "手煞車拉到底就夠了，我的車很新。", isCorrect: false, mindset: "過度自信。", failMsg: `老李：『萬一煞車咬不住勒？你有幾條命可以賠？』` },
        { text: "拍照回報哈尼，我有乖乖停車。", isCorrect: false, mindset: "戀愛腦。", failMsg: `老李：『你拍完照車也滑下去撞到電桿了啦！』` }
      ]
    },
    {
      story: `老李：『這路口三寶比蚊子還多，你那種「透明結界」路人看得到嗎？』`,
      desc: "如何依規定擺設交通維護設施？",
      options: [
        { text: "擺設至少4只交通錐、3根連桿、施工告示牌、車流指引牌及電動旗手。", isCorrect: true, sop: "依規定擺設交維設施(4只交通錐、3根連桿、施工告示牌、車流指引牌及電動旗手)。" },
        { text: "請學長去馬路中間幫忙指揮，他在那邊比較大隻，車子不敢撞。", isCorrect: false, mindset: "推卸責任。", failMsg: `老李：『你是骨頭散了還是腦袋壞了？我是你保母喔？我是看著你的安全，不是去當人體箭靶！設施給我去擺好！』` },
        { text: "隨便放2個圓錐意思一下，反正接線很快。", isCorrect: false, mindset: "敷衍取巧。", failMsg: `老李：『路人會當那是垃圾桶直接撞過來！沒看到連桿嗎？』` }
      ]
    },
    {
      story: `老李：『環境弄好了，還不快跟系統「拜碼頭」？不然你今天算白來。』`,
      desc: "確認現場環境可施工後，下一步是？",
      options: [
        { text: "執行進場打卡作業。", isCorrect: true, sop: "確認現場環境可施工後，執行進場打卡作業。" },
        { text: "先上去接線，收工再一起補打卡。", isCorrect: false, mindset: "拖延心態。", failMsg: `老李：『系統沒偵測到你到工，這單就直接作廢了，你今天做白工喔。』` },
        { text: "打電話給主管說我已經到了。", isCorrect: false, mindset: "依賴傳統。", failMsg: `老李：『現在都數位化了，快去打卡！』` }
      ]
    },
    {
      story: `老李：『${nickName}，這把梯子你看很久了吧，它的「腳墊」還健康嗎？』`,
      desc: "檢點梯具時，哪些重點不能漏？",
      options: [
        { text: "檢查梯腳防滑墊、升降勾、止滑帶、滑輪組狀況。", isCorrect: true, sop: "檢查防滑墊、升降勾、止滑帶及滑輪組狀況。" },
        { text: "看梯子沒斷、顏色還在就好。", isCorrect: false, mindset: "粗枝大葉。", failMsg: `老李：『防滑墊早就磨平了，你上去是想練極限運動喔？』` },
        { text: "梯子看起來很乾淨，上傳照片應該會過。", isCorrect: false, mindset: "外觀協會。", failMsg: `老李：『乾淨有屁用！滑輪卡住你就掛在半空了！』` }
      ]
    },
    {
      story: `老李：『過來！我看你這安全帶穿成這樣...你是想去跳芭蕾還是想當公公？』`,
      desc: "穿戴背負式安全帶時，大腿帶的正確間隙？",
      options: [
        { text: "腿帶與大腿間留一隻手厚度（約 3 公分）。", isCorrect: true, sop: "背負式安全帶正確穿戴要點是：肩帶和腿帶要收緊，大腿帶與大腿間最多僅能容納一隻手厚度（小於3公分），胸帶置於胸口中間；D環位置在肩胛骨中心，確保無鬆動，並依身高調整，使整體舒適服貼，以防墜落時受力分散，防止撞擊或勒傷。" },
        { text: "拉到最緊才紮實，摔下來絕對不脫落。", isCorrect: false, mindset: "過度教條。", failMsg: `老李：『太緊了！等下爬到一半抽筋，是要我上去抱你下來嗎？』` },
        { text: "留兩個拳頭寬，流汗才不會黏住，比較涼爽。", isCorrect: false, mindset: "放鬆警惕。", failMsg: `老李：『太鬆了！發生墜落的時候你會從安全帶溜出去變人體砲彈！』` }
      ]
    },
    {
      story: `老李：『D型環歪到哪去了？你是斜肩還是落枕？』`,
      desc: "背負式安全帶的 D 型環應置於何處？",
      options: [
        { text: "置於肩胛骨中央。", isCorrect: true, sop: "背負式安全帶正確穿戴要點是：肩帶和腿帶要收緊，大腿帶與大腿間最多僅能容納一隻手厚度（小於3公分），胸帶置於胸口中間；D環位置在肩胛骨中心，確保無鬆動，並依身高調整，使整體舒適服貼，以防墜落時受力分散，防止撞擊或勒傷。" },
        { text: "放在肚子前面，方便掛工具包。", isCorrect: false, mindset: "錯誤認知。", failMsg: `老李：『這樣墜落的時候會直接折斷你的腰！想後半輩子坐輪椅嗎？』` },
        { text: "隨便甩在背後，只要有扣到就好。", isCorrect: false, mindset: "散漫行為。", failMsg: `老李：『位置不對就沒保護力，重弄！』` }
      ]
    },
    {
      story: `老李：『這根電桿比你阿公還老，先跟它「問候」一下測測虛實吧。』`,
      desc: "上桿前如何科學地判斷電桿狀況？",
      options: [
        { text: "驗電筆測漏電、敲擊判定桿身、用力推動確認穩定。", isCorrect: true, sop: "驗電檢查、敲擊聽音、推動確認無斷桿風險。" },
        { text: "用腳踹兩下，看它會不會在那邊搖。", isCorrect: false, mindset: "暴力測試。", failMsg: `老李：『踹兩下會準喔？內部腐蝕你踹得出來？』` },
        { text: "雙手合十祈禱它今天心情好一點。", isCorrect: false, mindset: "迷信心態。", failMsg: `老李：『電磁波不會因為你虔誠就不電你！科學一點！』` }
      ]
    },
    {
      story: `老李：『看到那個箱子沒？裡面可能有「加料」的，去打個招呼。』`,
      desc: "處理桿上 RA 箱的標準排查動作？",
      options: [
        { text: "以長桿敲打 RA 箱確認有無蜂、蟻、蛇。", isCorrect: true, sop: "以長桿敲打 RA 箱確認有無生物躲藏。" },
        { text: "直接掀開，資深大師說這樣才夠膽。", isCorrect: false, mindset: "莽撞行為。", failMsg: `老李：『裡面藏著虎頭蜂啦！你變豬頭不要怪我！』` },
        { text: "先拿石頭砸看看有沒有東西爬出來。", isCorrect: false, mindset: "破壞行為。", failMsg: `老李：『砸壞了要賠錢！拿長桿輕敲啦！』` }
      ]
    },
    {
      story: `老李：『繩子先上！別急著上去表演馬戲團。』`,
      desc: "架設工作梯時，首先要安裝的是？",
      options: [
        { text: "首先安裝安全母索、吊物繩。", isCorrect: true, sop: "工作梯架設時，首先安裝安全母索、吊物繩。" },
        { text: "先把梯子拉到最高，確認高度。", isCorrect: false, mindset: "本末倒置。", failMsg: `老李：『重心不穩倒下來的時候，沒母索你根本救不回來！』` },
        { text: "先把工具袋掛在腰帶上。", isCorrect: false, mindset: "耍帥。", failMsg: `老李：『那是用吊的好嗎？你負重爬很厲害喔？』` }
      ]
    },
    {
      story: isEnvironmentClean ? `老李：『看！昨天多等那一天是值得的，今天這根桿子多「清爽」啊！』` : `老李：『等一下！${nickName}你看上面...那堆違規廣告跟號誌是怎樣？』`,
      desc: isEnvironmentClean ? "障礙物已移除，現在可以順利將工作梯拉伸？" : "電桿高度超過 2m，且障礙物極度密集無法有效掛索，你怎麼辦？",
      options: isEnvironmentClean ? [
        { text: "將工作梯拉伸至適當高度，準備作業。", isCorrect: true, sop: "將工作梯拉伸至適當高度。" },
        { text: "梯子隨便靠著就好，反正今天很乾淨。", isCorrect: false, mindset: "環境鬆懈。", failMsg: `老李：『規矩就是規矩！梯柱角度還是要≦75°！』` },
        { text: "既然清乾淨了，我改用徒手攀爬。", isCorrect: false, mindset: "突發奇想。", failMsg: `老李：『你是猴子轉世喔？給我拿梯子來！』` }
      ] : [
        { text: "障礙密集無法掛索，改用高空工作車替代，暫停梯升。", isCorrect: true, isSafetyStop: true, sop: "安全判斷：環境受限無法建立防護時，應改用高空工作車。" },
        { text: "母索隨便掛，我技術好可以繞過去。", isCorrect: false, mindset: "逞英雄。", failMsg: `老李：『摔下來你就掛在招牌上變肉餅，我怎麼交代？』` },
        { text: "不用母索了，反正接一條線很快。", isCorrect: false, mindset: "僥倖取巧。", failMsg: `老李：『快一分鐘，痛一輩子啦！給我滾下來！』` }
      ]
    },
    {
      story: `老李：『平結！那是安定繩的靈魂！${nickName}你打個蝴蝶結試試，我絕對巴下去！』`,
      desc: "安定繩要如何繞於工作梯並打結固定？",
      options: [
        { text: "繞於第四踏桿下方，繞電桿一圈，打「平結」固定。", isCorrect: true, sop: "安定繩繞於第四踏桿下方，繞桿一圈，打平結固定。" },
        { text: "隨便繞兩圈塞進梯腳縫裡就好。", isCorrect: false, mindset: "敷衍了事。", failMsg: `老李：『受力不均梯子會跳舞！你上去晃一下就嚇哭了啦！』` },
        { text: "打一個漂亮的海軍裝飾結。", isCorrect: false, mindset: "亂無章法。", failMsg: `老李：『你是來當海軍還是來做電通？平結啦！』` }
      ]
    },
    {
      story: `老李：『母索下部位置錯了，防墜器就是裝飾品啦！』`,
      desc: "安全母索固定於梯子的何處？",
      options: [
        { text: "固定於第三及第二個踏桿右側，並確認牢固。", isCorrect: true, sop: "安全母索固定於第三及第二個踏桿右側。" },
        { text: "綁在側柱側邊隨便個點，比較順手。", isCorrect: false, mindset: "取巧心態。", failMsg: `老李：『角度不對，防墜器鎖不死的！你是在拿命開玩笑？』` },
        { text: "綁在我的工作鞋大鎖上。", isCorrect: false, mindset: "無腦行為。", failMsg: `老李：『... ${nickName}，你明天是不是不想來了？』` }
      ]
    },
    {
      story: `老李：『${nickName}，照片拍好沒？這可是要上傳 LEMO 給大神審核的，拍美一點。』`,
      desc: "LEMO 審核照片應包含哪些內容？",
      options: [
        { text: "全區、裝備、工作梯、檢點表、施工告示牌、證照。", isCorrect: true, sop: "照片含施工全區、裝備、工作梯、檢點表、告示牌。" },
        { text: "只要拍到電桿跟梯子就好。", isCorrect: false, mindset: "以偏概全。", failMsg: `老李：『系統退件！沒告示牌想害大家沒獎金領喔？』` },
        { text: "拍一張我的帥臉傳上去。", isCorrect: false, mindset: "自戀行為。", failMsg: `老李：『系統會判定你是垃圾，給我重拍！』` }
      ]
    },
    {
      story: `老李：『看腳下！別把那堆狗屎泥巴帶上去梯子。』`,
      desc: "登梯前的最後細節確認？",
      options: [
        { text: "檢查鞋底有無異物。", isCorrect: true, sop: "登梯前應檢查鞋底有無異物。" },
        { text: "喝口大冰奶潤潤喉。", isCorrect: false, mindset: "緩慢節奏。", failMsg: `老李：『喝奶能防滑喔？看腳底啦！』` },
        { text: "把鞋帶綁成蝴蝶結求好運。", isCorrect: false, mindset: "迷信心態。", failMsg: `老李：『蝴蝶結勒！給我看鞋底有沒有油漬！』` }
      ]
    },
    {
      story: `老李：『子索扣好！防墜器位置要注意！那是你的救命索。』`,
      desc: "安全子索扣於防墜器後，防墜器的位置？",
      options: [
        { text: "防墜器保持在腰部以上位置。", isCorrect: true, sop: "子索扣於防墜器，防墜器保持在腰部以上位置。" },
        { text: "掛在腰部以下，比較沒阻力。", isCorrect: false, mindset: "圖方便。", failMsg: `老李：『墜落緩衝太長，你還是會撞到地上！這都要教幾遍？』` },
        { text: "拿在手裡，隨時準備調整。", isCorrect: false, mindset: "錯誤操作。", failMsg: `老李：『手是要抓梯子的！抓防墜器你拿什麼爬？』` }
      ]
    },
    {
      story: `老李：『剛上去先搖一搖，看這梯子有沒有想坑你。』`,
      desc: "踏上第一階梯後的關鍵確認動作？",
      options: [
        { text: "試踏輕搖確認工作梯是否穩固。", isCorrect: true, sop: "登梯後試踏輕搖確認工作梯是否穩固。" },
        { text: "一口氣衝到三公尺高，這樣重心比較穩。", isCorrect: false, mindset: "衝動行事。", failMsg: `老李：『下面萬一地軟歪掉，你連梯子一起翻！』` },
        { text: "低頭看著學長露出深情的微笑。", isCorrect: false, mindset: "不專心。", failMsg: `老李：『笑屁啊！看前面梯踏啦！』` }
      ]
    },
    {
      story: `老李：『三點接觸！你的手在抓哪裡？別亂抓！』`,
      desc: "登梯攀爬的黃金原則？",
      options: [
        { text: "手腳隨時維持三點以上接觸，每 2~3 階調防墜器。", isCorrect: true, sop: "維持三點以上接觸，每 2~3 階調整防墜器。" },
        { text: "兩手兩腳輪流移動，展現韻律感。", isCorrect: false, mindset: "協調不佳。", failMsg: `老李：『重心都偏了啦！三點不動一點動！重爬！』` },
        { text: "單手抓梯，另一手滑手機。", isCorrect: false, mindset: "致命習慣。", failMsg: `老李：『嚴禁攀登時使用手機！想死不要害人！』` }
      ]
    },
    {
      story: `老李：『到了！抱緊一點，電桿又不會嫌你煩。』`,
      desc: "到達工作高度後，固定腰帶的正確動作？",
      options: [
        { text: "單手抱桿，並逐一目視安全扣環確實扣好。", isCorrect: true, sop: "單手抱桿固定腰式帶，目視扣環確實扣好。" },
        { text: "雙手放開去扣扣環，比較好用力。", isCorrect: false, mindset: "冒失行為。", failMsg: `老李：『沒支撐點你就敢放手？你當你是在表演體操喔？』` },
        { text: "憑感覺扣上去有聽到聲音就好。", isCorrect: false, mindset: "盲目信任。", failMsg: `老李：『扣環卡住了你都不知道，一靠後你就變人體溜滑梯！』` }
      ]
    },
    {
      story: `老李：『屁股給我用力頂！讓我看到你的職人之魂！』`,
      desc: "如何確認腰部安全帶功能是否正常？",
      options: [
        { text: "雙手抱電桿再以臀部適當力量測試兩次。", isCorrect: true, sop: "須以雙手抱電桿再以臀部適當力量測試兩次。" },
        { text: "整個人直接往後躺，看帶子有沒有拉住我。", isCorrect: false, mindset: "賭命測試。", failMsg: `老李：『萬一沒扣死你就直接自由落體了！』` },
        { text: "大喊：「芝麻開門！」，看腰帶有沒有反應。", isCorrect: false, mindset: "神經大條。", failMsg: `老李：『...自己用屁股測試啦！』` }
      ]
    },
    {
      story: `老李：『好啦，可以換檔了，準備幹活。』`,
      desc: "腰帶確認穩固後的防護切換順序？",
      options: [
        { text: "將安全子索從防墜器解開，並扣於電纜鋼鉸線上。", isCorrect: true, sop: "確認腰帶功能後，將安全子索改扣於電纜鋼鉸線上。" },
        { text: "繼續掛在防墜器上幹活，比較方便。", isCorrect: false, mindset: "因循怠惰。", failMsg: `老李：『鋼鉸線才是工作防護點！規矩給我守好！』` },
        { text: "子索解開先掛在肩膀上。", isCorrect: false, mindset: "極度危險。", failMsg: `老李：『你是想拿救命繩來自盡喔？』` }
      ]
    },
    {
      story: `老李：『袋子吊上來！繩子收好，你以為你是姜太公，願者上鉤喔?』`,
      desc: "工具袋吊起定位後的專業細節？",
      options: [
        { text: "吊物繩整理至工具袋中，不可任意垂放。", isCorrect: true, sop: "吊起工具袋到定位後，吊物繩須整理至工具袋中。" },
        { text: "讓繩子垂在梯子旁邊比較好抓。", isCorrect: false, mindset: "僥倖取巧。", failMsg: `老李：『卡車經過就把你勾走了！變空中風箏好玩嗎？』` },
        { text: "繩子隨便纏在橫擔上。", isCorrect: false, mindset: "雜亂作業。", failMsg: `老李：『等下纏到你的腳你就下不來了！』` }
      ]
    },
    {
      story: `老李：『下班最危險！順序錯了我就真的要巴下去了！』`,
      desc: "完工要下桿，解開腰帶的前置必修動作？",
      options: [
        { text: "先將安全子索扣於防墜器，才能解開腰帶。", isCorrect: true, sop: "下桿前先將安全子索扣於防墜器後，才能解開腰帶。" },
        { text: "先解開腰帶，活動比較方便。", isCorrect: false, mindset: "大意失荊州。", failMsg: `老李：『腳滑就沒救了！防護不能斷，${nickName}！』` },
        { text: "直接把腰帶拆了丟到後斗。", isCorrect: false, mindset: "急於下班。", failMsg: `老李：『那是公司的財產！還有你的命！』` }
      ]
    },
    {
      story: `老李：『落地了？還沒完呢，別急著喝飲料，把環境弄乾淨。』`,
      desc: "踏地後移除安定繩與下放梯子的標準順序？",
      options: [
        { text: "鬆解子索、移除安定繩、再降下工作梯解開上部鉤環。", isCorrect: true, sop: "踏地後鬆解子索、移除安定繩，再降梯解開上部鉤環。" },
        { text: "直接把梯子拉下來，繩子等下再剪。", isCorrect: false, mindset: "暴力拆除。", failMsg: `老李：『母索卡在上面你去拿？給我按順序來！』` },
        { text: "先把安定繩割斷，省得解結。", isCorrect: false, mindset: "浪費公物。", failMsg: `老李：『你是破壞狂喔？那是公家買的！』` }
      ]
    },
    {
      story: `老李：『最後的一分鐘，別在最後一關出包！』`,
      desc: "撤除交維設施與環境整頓的最終順序？",
      options: [
        { text: "先把工作區域的物品收一收，再由遠而近移除圍籬設施", isCorrect: true, sop: "先巡視工作區域清理廢心線或其他工餘物品等，再由近而遠移除圍籬設施。" },
        { text: "由近而遠拆，比較快搬上車回家。", isCorrect: false, mindset: "邏輯錯誤。", failMsg: `老李：『後方車輛沒看到防線直接撞過來！你想害死我喔！』` },
        { text: "先去旁邊坐著喝咖啡，等學長收。", isCorrect: false, mindset: "虎頭蛇尾。", failMsg: `老李：『沒收完不准喝！你是想在那邊過夜喔？』` }
      ]
    }
  ], [isEnvironmentClean, nickName]);

  // 當 Stage 改變時，隨機排序選項
  useEffect(() => {
    if (rawStagesData[stage]) {
      setCurrentShuffledOptions(shuffleArray(rawStagesData[stage].options));
    }
  }, [stage, isEnvironmentClean, rawStagesData]);

  // 提交結果至 Google 表單
  const submitToGoogleForm = async () => {
    if (hasSubmitted) return;
    const formData = new FormData();
    formData.append(ENTRY_IDS.company, userInfo.company);
    formData.append(ENTRY_IDS.name, userInfo.name);
    formData.append(ENTRY_IDS.score, score.toString());
    formData.append(ENTRY_IDS.lives, lives.toString());
    formData.append(ENTRY_IDS.status, lives > 0 ? "挑戰成功" : "挑戰失敗");

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      setHasSubmitted(true);
    } catch (e) {
      console.error("Submit error", e);
    }
  };

  useEffect(() => {
    if (gameOver) {
      submitToGoogleForm();
    }
  }, [gameOver]);

  const handleOptionClick = (option) => {
    if (option.isCorrect) {
      setFeedback({ type: 'success', msg: option.sop, isSafetyStop: option.isSafetyStop });
      setScore(score + 100);
      
      if (option.isSafetyStop) {
        setShowSafetyBtn(false);
        setTimeout(() => setShowSafetyBtn(true), 1200);
      }
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setLives(lives - 1);
      setFeedback({ type: 'error', msg: option.failMsg, mindset: option.mindset });
      if (lives <= 1) setTimeout(() => setGameOver(true), 2000);
    }
  };

  const proceedToTransition = () => {
    setFeedback(null);
    setIsTransitioning(true);
  };

  const finishTransition = () => {
    setIsEnvironmentClean(true);
    setIsTransitioning(false);
    setStage(0); 
    setFeedback(null);
    setShowSafetyBtn(false);
  };

  const nextStage = () => {
    setFeedback(null);
    if (stage < rawStagesData.length - 1) {
      setStage(stage + 1);
    } else {
      setGameOver(true);
    }
  };

  const restart = () => {
    setStage(0); setScore(0); setLives(3);
    setGameOver(false); setFeedback(null); 
    setIsEnvironmentClean(false);
    setShowSafetyBtn(false);
    setHasSubmitted(false);
  };

  // --- UI 元件 ---

  const Footer = () => (
    <div className="mt-8 mb-4 text-slate-400/60 text-sm font-bold tracking-widest text-center w-full animate-pulse">
      中華電信桿上英雄特訓｜©Keely
    </div>
  );

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900 border-4 border-blue-600 rounded-[2.5rem] p-10 shadow-[0_0_60px_rgba(37,99,235,0.4)] animate-in fade-in zoom-in duration-500 text-center">
          <HardHat className="mx-auto text-yellow-500 mb-6 animate-bounce" size={70} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Pole Master</h1>
          <p className="text-slate-400 font-bold mb-8 italic">高架作業進場登記系統</p>
          <form className="space-y-6 text-left" onSubmit={(e) => { e.preventDefault(); setIsRegistered(true); }}>
            <div className="space-y-2">
              <label className="text-blue-400 text-xs font-black uppercase tracking-widest px-1">所屬單位 / 公司</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" required placeholder="例如：中華電信" className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all font-bold text-white" value={userInfo.company} onChange={(e) => setUserInfo({...userInfo, company: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-blue-400 text-xs font-black uppercase tracking-widest px-1">你的姓名</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" required placeholder="請輸入姓名" className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all font-bold text-white" value={userInfo.name} onChange={(e) => setUserInfo({...userInfo, name: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-2xl rounded-[1.5rem] shadow-[0_8px_0_rgb(29,78,216)] active:translate-y-2 active:shadow-none transition-all mt-4">
              簽領工單，上工
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }

  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full bg-slate-900 border-4 border-yellow-500 rounded-[3rem] p-12 text-center shadow-2xl animate-in fade-in duration-1000">
           <Sunrise className="mx-auto text-yellow-400 mb-8 animate-pulse" size={120} />
           <h2 className="text-5xl font-black italic mb-6 uppercase tracking-widest">隔日．清晨</h2>
           <div className="bg-slate-800 p-8 rounded-3xl border-l-8 border-yellow-500 text-left mb-12 shadow-inner">
              <p className="text-yellow-100 font-bold text-2xl italic mb-4">老李：『{nickName}，昨天決定得好。』</p>
              <p className="text-slate-300 leading-relaxed text-lg font-medium">高空車昨晚已經把雜亂的號誌跟招牌清掉了。今天電桿終於「穿乾淨」了。帶上你的梯子，我們重新開始作業！</p>
           </div>
           <button onClick={finishTransition} className="w-full py-7 bg-blue-600 hover:bg-blue-500 text-white font-black text-3xl rounded-[2rem] flex items-center justify-center gap-3 shadow-[0_12px_0_rgb(29,78,216)] transition-all active:translate-y-2 active:shadow-none">
             開始第二天作業 <ChevronRight size={40} />
           </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isShaking ? 'bg-red-950' : 'bg-slate-950'} text-white flex flex-col items-center justify-center p-4 font-sans`}>
      <div className={`max-w-2xl w-full bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border-2 border-slate-800 ${isShaking ? 'animate-shake' : ''}`}>
        
        {/* Header Section */}
        <div className="bg-slate-800 p-6 border-b border-slate-700 flex justify-between items-center">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} size={28} className={i < lives ? "fill-red-500 text-red-500 animate-pulse" : "text-slate-700"} />
            ))}
          </div>
          <div className="text-right">
             <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{userInfo.company}</div>
             <div className="text-white font-black text-lg">{userInfo.name}</div>
          </div>
          <div className="bg-slate-950 px-5 py-2 rounded-2xl text-blue-400 font-black border border-blue-500/30 shadow-inner">SCORE: {score}</div>
        </div>

        {/* SOP Progress Bar */}
        <div className="px-8 py-3 bg-slate-800/50 flex items-center gap-4 border-b border-slate-800/50">
           <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest whitespace-nowrap">SOP Step</span>
           <div className="flex-1 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700 shadow-inner">
              <div className={`h-full transition-all duration-1000 ease-out ${isEnvironmentClean ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 'bg-gradient-to-r from-blue-700 to-blue-400'}`} style={{ width: `${((stage + 1) / rawStagesData.length) * 100}%` }}></div>
           </div>
           <span className="text-xs text-slate-400 font-black">{stage+1} / {rawStagesData.length}</span>
        </div>

        {/* Mentor Box */}
        <div className="p-7 bg-slate-800/30 border-b border-slate-700 flex gap-6 items-start">
           <div className="w-20 h-20 rounded-3xl bg-slate-700 border-2 border-slate-500 shadow-xl flex-shrink-0 flex items-center justify-center -rotate-3 transition-transform hover:rotate-0">
              <span className="text-4xl font-black text-slate-300 italic uppercase">Li</span>
           </div>
           <div className="bg-slate-900 p-6 rounded-3xl rounded-tl-none border border-slate-700 relative flex-1 shadow-2xl min-h-[100px] flex items-center transition-all duration-300">
              <div className="absolute top-0 left-[-10px] w-0 h-0 border-t-[10px] border-t-slate-700 border-l-[10px] border-l-transparent"></div>
              <p className="text-blue-100 font-bold italic leading-relaxed text-xl whitespace-pre-line">「{rawStagesData[stage].story}」</p>
           </div>
        </div>

        <div className="p-8">
          {!gameOver ? (
            <div>
              {!feedback ? (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                   <div className="space-y-3">
                      <div className="flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-[0.4em]">
                        <Activity size={14} className="animate-pulse" /> Scene Description
                      </div>
                      <p className="text-slate-300 text-2xl font-medium leading-snug italic bg-slate-950/50 p-7 rounded-3xl border border-slate-800 shadow-inner text-center">
                        {rawStagesData[stage].desc}
                      </p>
                   </div>

                   <div className="grid gap-4">
                      {currentShuffledOptions.map((opt, idx) => (
                        <button key={idx} onClick={() => handleOptionClick(opt)} className="group text-left p-6 rounded-[2.5rem] border-2 border-slate-700 bg-slate-800/40 hover:bg-slate-800 hover:border-blue-500 transition-all hover:scale-[1.03] active:scale-95 shadow-lg">
                           <div className="flex gap-5 items-center">
                              <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-700 group-hover:bg-blue-600 flex items-center justify-center font-black text-slate-400 group-hover:text-white transition-colors text-3xl shadow-xl">
                                <MousePointer2 size={24} />
                              </span>
                              <span className="text-slate-200 group-hover:text-white font-medium text-xl leading-tight">{opt.text}</span>
                           </div>
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="text-center py-6 animate-in zoom-in duration-300">
                   {feedback.type === 'success' ? (
                     <div className="space-y-10">
                        <CheckCircle size={160} className="text-green-500 mx-auto drop-shadow-[0_0_40px_rgba(34,197,94,0.6)]" />
                        <h3 className="text-5xl font-black text-green-500 uppercase italic tracking-tighter underline decoration-green-900 underline-offset-8 text-white">審核通過</h3>
                        <div className="bg-slate-950 p-8 rounded-[3rem] text-left border-l-8 border-green-500 shadow-2xl">
                           <p className="text-slate-500 text-[10px] font-black mb-3 uppercase tracking-[0.5em]">Official SOP Verified:</p>
                           <p className="text-white text-2xl font-bold italic leading-relaxed">「{feedback.msg}」</p>
                        </div>
                        {feedback.isSafetyStop ? (
                           <div className="min-h-[100px] flex items-center justify-center">
                             {showSafetyBtn ? (
                               <button onClick={proceedToTransition} className="w-full py-8 bg-yellow-600 hover:bg-yellow-500 text-white font-black text-3xl rounded-[3rem] flex items-center justify-center gap-4 shadow-[0_12px_0_rgb(161,98,7)] transition-all animate-in slide-in-from-bottom duration-500">
                                  申請替代工法 <Truck size={48} />
                               </button>
                             ) : (
                               <div className="text-blue-400 font-black text-xl animate-pulse">決策確認中，請稍候...</div>
                             )}
                           </div>
                        ) : (
                          <button onClick={nextStage} className="w-full py-8 bg-green-600 hover:bg-green-500 text-white font-black text-3xl rounded-[3rem] flex items-center justify-center gap-4 shadow-[0_12px_0_rgb(21,128,61)] transition-all active:translate-y-2 active:shadow-none">
                             執行下一階段 <ChevronRight size={48} />
                          </button>
                        )}
                     </div>
                   ) : (
                     <div className="space-y-10">
                        <XCircle size={160} className="text-red-500 mx-auto animate-pulse drop-shadow-[0_0_40px_rgba(239,68,68,0.6)]" />
                        <h3 className="text-5xl font-black text-red-500 uppercase italic tracking-tighter underline decoration-red-900 underline-offset-8 text-white">老李炸裂啦！</h3>
                        <p className="text-3xl text-white font-black italic px-6 leading-tight underline decoration-red-500 underline-offset-12 decoration-4">「{feedback.msg}」</p>
                        <div className="bg-red-950/30 p-8 rounded-[3rem] text-left border-2 border-red-500/30 shadow-xl">
                           <h4 className="text-red-400 font-black mb-3 flex items-center gap-3 uppercase text-lg"><AlertTriangle size={24}/> 菜鳥心態分析:</h4>
                           <p className="text-red-100/90 italic font-medium leading-relaxed text-xl">{feedback.mindset}</p>
                        </div>
                        {lives > 0 ? (
                          <button onClick={() => setFeedback(null)} className="w-full py-6 bg-slate-700 hover:bg-slate-600 text-white font-black text-3xl rounded-[2.5rem] shadow-xl transition-all active:scale-95">
                            老李：『呼...{nickName}你嚇死我了，這關給我重來！』
                          </button>
                        ) : (
                          <div className="text-red-500 font-black text-4xl animate-bounce pt-10 tracking-[0.1em] uppercase text-center">❌ 特訓終止：停工 ❌</div>
                        )}
                     </div>
                   )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 animate-in slide-in-from-bottom duration-700">
               <Trophy size={180} className={`mx-auto mb-10 ${lives > 0 ? 'text-yellow-400 animate-pulse' : 'text-slate-700'}`} />
               <h2 className="text-8xl font-black mb-8 uppercase italic text-white tracking-tighter leading-none">{lives > 0 ? "傳奇誕生" : "吊銷執照"}</h2>
               <p className="text-slate-300 text-3xl mb-12 font-bold px-10 italic leading-relaxed">
                  {lives > 0 
                  ? `老李：『${nickName}這頓咖啡我請！雖然中間為了安全多等了一天，但這才是真正的專業。回${userInfo.company}結案吧！』` 
                  : `老李：『我就知道你沒在聽！${nickName}給我去把 SOP 抄一百遍！現在就去！』`}
               </p>
               <div className="grid grid-cols-2 gap-10 mb-14">
                  <div className="bg-slate-950 p-12 rounded-[3rem] border-2 border-slate-800 shadow-inner text-center">
                    <div className="text-sm text-slate-500 font-black uppercase mb-4 tracking-widest px-1">安全積分</div>
                    <div className="text-7xl font-black text-blue-500">{score}</div>
                  </div>
                  <div className="bg-slate-950 p-12 rounded-[3rem] border-2 border-slate-800 shadow-inner text-center">
                    <div className="text-sm text-slate-500 font-black uppercase mb-4 tracking-widest px-1">職人等級</div>
                    <div className={`text-3xl font-black ${lives > 0 ? 'text-yellow-500' : 'text-red-500'}`}>{lives === 3 ? "桿上大神" : lives > 0 ? "專業技師" : "重訓學員"}</div>
                  </div>
               </div>
               
               <div className="flex items-center justify-center gap-2 mb-8 text-blue-400/60 font-bold italic animate-pulse text-center">
                  <Send size={18} /> 特訓結果已回報至管理系統
               </div>

               <button onClick={restart} className="w-full py-9 bg-blue-600 hover:bg-blue-500 text-white font-black text-5xl rounded-[4rem] shadow-[0_20px_0_rgb(29,78,216)] transition-all hover:scale-105 active:translate-y-4 active:shadow-none uppercase">再次挑戰</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-15px); } 75% { transform: translateX(15px); } } .animate-shake { animation: shake 0.15s ease-in-out infinite; }` }} />
    </div>
  );
};

export default App;