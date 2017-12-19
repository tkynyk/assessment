(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    
    //assessmentButton.onclick = function(){
    // console.log('ボタンが押されました');
    //};
    assessmentButton.onclick = () => {//匿名関数
        const userName = userNameInput.value;
        if (userName.length === 0){ //名前が空のとき(ガード句)
            return;
        }

    /**
    * 指定した要素の子供を全て削除する
    */
        function removeAllChildren(element){
            while(element.firstChild){//子要素がある限り削除する　jsでは要素があるtureないfalse
                element.removeChild(element.firstChild);
            }
        }
    
    //診断結果表示エリア作成
    
        removeAllChildren(resultDivided);
        
        //while (resultDivided.firstChild){
        //    resultDivided.removeChild(resultDivided.firstChild);
        //}
            
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);
    
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText =result;
        resultDivided.appendChild(paragraph);
    
    //ツイートエリア<a href="https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text=hoge" class="twitter-hashtag-button">Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D</a>
        
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text='
             + encodeURIComponent(result);
    
        anchor.setAttribute('href',hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet %E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
    
    };

//enterキー押されたときも診断する--上に記述するとうまくいかない？
        userNameInput.onkeydown = (event) => {
           if(event.keyCode === 13){
               assessmentButton.onclick(); 
           }
     　 }

    const answer = [
        '{userName}さんのいいところは声です。\n{userName}さんの特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}さんのいいところはまなざしです。\n{userName}さんに見つめられた人は、気になって仕方がないでしょう。',
        '{userName}さんのいいところは情熱です。\n{userName}さんの情熱に周りの人は感化されます。',
        '{userName}さんのいいところは厳しさです。\n{userName}さんの厳しさがものごとをいつも成功に導きます。',
        '{userName}さんのいいところは知識です。\n博識な{userName}さんを多くの人が頼りにしています。',
        '{userName}さんのいいところはユニークさです。\n{userName}さんだけのその特徴が皆を楽しくさせます。',
        '{userName}さんのいいところは用心深さです。\n{userName}さんの洞察に、多くの人が助けられます。',
        '{userName}さんのいいところは見た目です。\n内側から溢れ出る{userName}さんの良さに皆が気を惹かれます。',
        '{userName}さんのいいところは決断力です。\n{userName}さんがする決断にいつも助けられる人がいます。',
        '{userName}さんのいいところは思いやりです。\n{userName}さんに気をかけてもらった多くの人が感謝しています。',
        '{userName}さんのいいところは感受性です。\n{userName}さんが感じたことに皆が共感し、わかりあうことができます。',
        '{userName}さんのいいところは節度です。\n強引すぎない{userName}さんの考えに皆が感謝しています。',
        '{userName}さんのいいところは好奇心です。\n新しいことに向かっていく{userName}さんの心構えが多くの人に魅力的に映ります。',
        '{userName}さんのいいところは気配りです。\n{userName}さんの配慮が多くの人を救っています。',
        '{userName}さんのいいところはその全てです。\nありのままの{userName}さん自身がいいところなのです。',
        '{userName}さんのいいところは自制心です。\nやばいと思ったときにしっかりと衝動を押さえられる{userName}さんが皆から評価されています。',
        '{userName}さんのいいところは優しさです。\nあなたの優しい雰囲気や立ち振舞に多くの人が癒やされています。'
    ];

    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param{string} userName
    * @return{string} 診断結果
    */
    function assessment(userName){
        //全文字コード番号を取得してそれを足しあわせる-一文字ずつコード番号化してたす-文字数分ループ
        let sum0fcharCode = 0;
        for (let i = 0; i < userName.length; i++){
            sum0fcharCode = sum0fcharCode + userName.charCodeAt(i);
        }

        //文字のコード番号の合計を回答の数で割って添字の数値を求める-answerのindex番目をresultに
        const index  = sum0fcharCode % answer.length;
        let result = answer[index];
        result = result.replace(/\{userName\}/g, userName);//reultつまりanswerの{userName}部分を入力された文字に置換
                                //正規表現　g該当箇所すべて
        return result;
    }
    
    console.assert(//正しい出力かどうか-2番目の太郎が次郎になってしまうバグなどあった場合気付きづらいので
    assessment('太郎') === '太郎さんのいいところはユニークさです。\n太郎さんだけのその特徴が皆を楽しくさせます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(//太郎の診断結果がいつも同じかどうか
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
})();
