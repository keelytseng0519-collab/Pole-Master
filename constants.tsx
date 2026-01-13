
import { Stage } from './types';

export const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSegAagkpHeWspykd_5OqqZDQZ6OgTJTAQto38pA9eyN2dCvGA/formResponse";

export const ENTRY_IDS = {
  company: "entry.581240603", 
  name: "entry.1915412366",
  score: "entry.1710980397",
  lives: "entry.1012539758",
  status: "entry.1811303318"
};

export const getRawStages = (nickName: string, isEnvironmentClean: boolean): Stage[] => [
  {
    story: isEnvironmentClean ? `老李：『唷，${nickName}早安啊！睡飽沒？雖然障礙物清掉了，但該穿的還是得穿好，第一步做啥？』` : `老李：『喂！${nickName}，車才剛停好，眼睛在那邊亂看什麼？看帥哥還是看美女？給我滾下車！』`,
    desc: "抵達現場下車後的第一組連動動作是？",
    options: [
      { text: "下車穿反光背心、戴帽，並進行身心狀況自檢。", isCorrect: true, sop: "抵達現場下車穿反光背心、戴帽並自檢。" },
      { text: "趕快去搬梯子，展現積極的效率給學長看。", isCorrect: false, mindset: "莽撞趕工。", failMsg: `老李：『反光背心勒？是想當隱形人啊?』` },
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
      { text: "請學長去馬路中間幫忙指揮，我在這架梯比較快。", isCorrect: false, mindset: "推卸責任。", failMsg: `老李：『你是骨頭散了還是腦袋壞了？我是你保母喔？我是負責看著你的安全，不是去當靶子！設施給我去擺好！』` },
      { text: "隨便放2個圓錐意思一下，反正接線很快。", isCorrect: false, mindset: "敷衍取巧。", failMsg: `老李：『路人會當那是垃圾桶直接撞過來！沒看到連桿嗎？』` }
    ]
  },
  {
    story: `老李：『環境弄好了，還不快跟系統「拜碼頭」？不然你今天算白來。』`,
    desc: "確認現場環境可施工後，下一步是？",
    options: [
      { text: "執行進場打卡作業。", isCorrect: true, sop: "確認環境可施工後，執行進場打卡作業。" },
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
      { text: "腿帶與大腿間留一隻手厚度（約 3 公分）。", isCorrect: true, sop: "腿帶間隙僅能容納一隻手厚度(約3公分)。" },
      { text: "拉到最緊才紮實，摔下來絕對不脫落。", isCorrect: false, mindset: "過度教條。", failMsg: `老李：『太緊了！等下爬到一半抽筋，是要我上去抱你下來嗎？』` },
      { text: "留兩個拳頭寬，流汗才不會黏住，比較涼爽。", isCorrect: false, mindset: "放鬆警惕。", failMsg: `老李：『太鬆了！發生墜落的時候你會從安全帶溜出去變人體砲彈！』` }
    ]
  },
  {
    story: `老李：『D型環歪到哪去了？你是斜肩還是落枕？』`,
    desc: "背負式安全帶的 D 型環應置於何處？",
    options: [
      { text: "置於肩胛骨中央。", isCorrect: true, sop: "D型環應置於肩胛骨中央。" },
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
      { text: "雙手合十祈禱它今天心情好一點。", isCorrect: false, mindset: "迷信心態。", failMsg: `老李：『神明很忙，科學一點行不行！』` }
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
      { text: "先把工具袋掛在腰帶上。", isCorrect: false, mindset: "自找麻煩。", failMsg: `老李：『那是用吊的好嗎？你負重爬很厲害喔？』` }
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
      { text: "綁在側柱側邊隨便個點，比較順手。", isCorrect: false, mindset: "取巧心態。", failMsg: `老李：『角度不對，防墜器鎖不死的！』` },
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
      { text: "掛在腰部以下，比較沒阻力。", isCorrect: false, mindset: "圖方便。", failMsg: `老李：『墜落緩衝太長，你還是會撞到地上！』` },
      { text: "拿在手裡，隨時準備調整。", isCorrect: false, mindset: "錯誤操作。", failMsg: `老李：『手是要抓梯子的！抓防墜器你拿什麼爬？』` }
    ]
  },
  {
    story: `老李：『剛上去先搖一搖，看這梯子有沒有想坑你。』`,
    desc: "踏上第一階梯後的關鍵確認動作？",
    options: [
      { text: "試踏輕搖確認工作梯是否穩固。", isCorrect: true, sop: "登梯後試踏輕搖確認工作梯是否穩固。" },
      { text: "一口氣衝到三公尺高。", isCorrect: false, mindset: "衝動行事。", failMsg: `老李：『下面萬一地軟歪掉，你連梯子一起翻！』` },
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
    story: `老李：『袋子吊上來！繩子收好，別讓路過大車把你釣走。』`,
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
    story: `老李：『最後的一分鐘，由遠而近，別在最後一關出包！』`,
    desc: "撤除交維設施與環境整頓的最終順序？",
    options: [
      { text: "先把工作區域的物品收一收，再由遠而近移除圍籬設施", isCorrect: true, sop: "先巡視工作區域清理廢心線或其他工餘物品等，再由近而遠移除圍籬設施。" },
      { text: "由近而遠拆，比較快搬上車回家。", isCorrect: false, mindset: "邏輯錯誤。", failMsg: `老李：『後方車輛沒看到防線直接撞過來！你想害死我喔！』` },
      { text: "先去旁邊坐著喝咖啡，等學長收。", isCorrect: false, mindset: "虎頭蛇尾。", failMsg: `老李：『沒收完不准喝！你是想在那邊過夜喔？』` }
    ]
  }
];
