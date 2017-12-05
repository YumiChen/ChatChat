import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import kaoEmoji from "../data/kaoEmoji";

const Emoji = (props)=>{
    const emojis = "😀😃😄😁😆😅😂😊😇😉😌😍😘😗😙😚😋😜😝😛😎😏😒😞😔😟😕😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌️🤘👌👈👉👆👇☝️✋🤚🖐👋🤙💪🖕✍️🤳💅💄👄👅👂👃👣👀🗣👤👥👶👴👵👲🤶🎅👸🤴👰🤵👼🤰🕴💃🕺👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩👑⛑🎒👝👛👜👓🕶🌂☂️🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐽🐸🐵🙉🙊🐒🐔🐧🐦🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐚🐞🐜🕷🕸🐢🐍🦎🦂🦀🦑🐙🦐🐠🐟🐡🐬🦈🐳🐋🐊🐆🐅🐃🐂🐄🦌🐪🐫🐘🦏🦍🐎🐖🐐🐏🐑🐕🐩🐈🐓🦃🕊🐇🐁🐀🐿🐾🐉🐲🌵🎄🌲🌳🌴🌱🌿☘️🍀🎍🎋🍃🍂🍁🍄💐🌷🌹🥀🌻🌼🌸🌺🌎🌍🌏🌕🌖🌗🌘🌑🌒🌓🌔🌚🌝🌞🌛🌜🌙💫⭐️🌟✨⚡️🔥💥☄️☀️🌤⛅️🌥🌦☁️🌧⛈🌩🌨☃️⛄️❄️🌬💨🌪🌫🌊💧💦🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🥝🥑🍅🍆🥒🥕🌽🌶🥔🍠🌰🥜🍯🥐🍞🥖🧀🥚🥓🥞🍤🍗🍖🍕🌭🍔🍟🥙🌮🌯🥗🥘🍝🍜🍲🍥🍣🍱🍛🍚🍙🍘🍢🍡🍧🍨🍦🍰🎂🍮🍭🍬🍫🍿🍩🍪🥛🍼☕️🍵🍶🍺🍻🥂🍷🥃🍸🍹🍾🥄🍴🍽⚽️🏀🏈⚾️🎾🏐🏉🎱🏓🏸🥅🏒🏑🏏⛳️🏹🎣🥊🥋⛸🎿⛷🏂🤺‍♂️⛹️‍♀️⛹️🏇🎽🏅🎖🥇🥈🥉🏆🏵🎗🎫🎟🎪🎭🎬🎧🎼🎹🥁🎷🎺🎸🎻🎲🎯🎳🎮🎰🚗🚕🚙🚌🚎🏎🚓🚑🚐🚚🚛🚜🛴🚲🛵🏍🚨🚔🚍🚘🚖🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉🚁🛩✈️🛫🛬🛰💺🛶⛵️🛥🚤🛳⛴🚢⚓️🚧⛽️🚏🚦🚥🗺🗿🗽⛲️🗼🏰🏯🏟🎡🎢🎠⛱🏖🏝⛰🏔🗻🌋🏜🏕⛺️🛤🛣🏗🏠🏡🏘🏚🏢🏬🏣🏤🏥🏦🏨🏪🏩💒🏛⛪️🕌🕍🕋⛩🗾🎑🏞🌅🌄🌠🎇🎆🌇🌆🏙🌃🌌🌉🌁⌚️📱📲⌨️🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞☎️📟📠📺📻🎙🎚🎛⏱⏲⏰🕰⌛️⏳📡🔋🔌💡🔦🕯🗑🛢💸💵💴💶💷💰💳💎⚖️🔨⚒🛠⛏🔩⚙️⛓🔫💣🔪🗡⚔️🛡🚬⚰️⚱️🏺🔮📿💈⚗️🔭🕳💊💉🌡🚽🚰🚿🛁🛀🛎🔑🗝🚪🛋🛏🛌🖼🛍🛒🎁🎈🎏🎀🎊🎉🎎🏮🎐✉️📩📨📧💌📥📤📦🏷📪📫📬📭📮📯📜📃📄📑📊📈📉🗒🗓📆📅📇🗃🗳🗄📋📁📂🗂🗞📰📓📔📒📕📗📘📙📚📖🔖🔗📎🖇📐📏📍🎌✂️🖊🖋✒️🖌🖍📝✏️🔍🔎🔏🔐🔒🔓💛💚💙💜🖤💔❣️💕💞💓💗💖💘💝💟☮️✝️☪️🕉☸️✡️🔯🕎☯️☦️🛐⛎♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️🆔⚛️🉑☢️☣️📴📳🈶🈚🈸🈺🈷️🆚💮🉐㊙️㊗️🈴🈵🈹🈲🅰🅱🆎🆑🅾🆘❌⭕️🛑⛔️📛🚫💯💢♨️🚷🚯🚳🚱🔞📵🚭❗️❕❓❔‼️⁉️🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿️🅿🈳🈂🛂🛃🛄🛅🚹🚺🚼🚻🚮🎦📶🈁🔣ℹ️🔤🔡🔠🆖🆗🆙🆒🆕🆓0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟🔢#️⃣*️⃣▶️⏸⏯⏹⏺⏭⏮⏩⏪⏫⏬◀️🔼🔽➡️⬅️⬆️⬇️↗️↘️↙️↖️↕️↔️↪️↩️⤴️⤵️🔀🔁🔂🔄🔃🎵🎶➕➖➗✖️💲💱™️©️®️〰️➰➿🔚🔙🔛🔝✔️☑️🔘⚪️⚫️🔴🔵🔺🔻🔸🔹🔶🔷🔳🔲▪️▫️◾️◽️◼️◻️⬛️⬜️🔈🔇🔉🔊🔔🔕📣📢🗨💬💭🗯♠️♣️♥️♦️🃏🎴🀄🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧🚩";

    return (
      <Tabs style={{height: "15rem"}}
      className="emojis noSelect"
      tabTemplateStyle={{overflow:"hidden", overflowY:"auto",backgroundColor:"white", height:"12rem"}}>
        <Tab label="表情符號">
            {emojiStringToArray(emojis).map((emoji,index)=>{ 
                return <span key={index} className="emoji" onClick={props.addEmoji}>
                    {String.fromCodePoint(emoji.codePointAt(0))}
                </span>
            })}
        </Tab>
        <Tab label="顏文字">
            {kaoEmoji.map((emoji,index)=>{ 
                return <span key={index} className="kaomoji" onClick={props.addEmoji}>
                    {emoji}
                </span>
            })}
        </Tab>
      </Tabs>
    );
};

var emojiStringToArray = function (str) {
    var split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/),
        arr = [], char;
    for (var i=0; i<split.length; i++) {
      char = split[i]
      if (char !== "") {
        arr.push(char);
      }
    }
    return arr;
};


export default Emoji;