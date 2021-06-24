const { randomNum } = require('./utils');

function compileHTML(mdContent) {
  console.log('===========mdContent===========');
  console.log(mdContent);
  const _mdArr = mdContent.split('\n');
  console.log('===========mdArr===========');
  console.log(_mdArr);
  const _htmlPool = createTree(_mdArr);
  let _htmlStr = '';
  for(let key in _htmlPool) {
    console.log('===========key===========');
    console.log(key, _htmlPool[key]);
    let item = _htmlPool[key];
    if (item.type === 'single') {
      item.tags.forEach(tag => {
        _htmlStr += tag;
      })
    } else if (item.type === 'wrap') {
      let _list = `<${key.split('-')[0]}>`;
      item.tags.forEach(tag => {
        _list += tag;
      })
      _list += `</${key.split('-')[0]}>`;
      _htmlStr += _list;
    }
  };
  console.log('===========_htmlStr===========');
  console.log(_htmlStr);
  return _htmlStr;
}
module.exports = compileHTML;

const reg_mark = /^(.+?)\s/; // 从开头到空格
const reg_sharp = /^\#/; // # 号开头
const reg_crossbar = /^\-/; // - 号开头
const reg_number = /^\d/; // 数字开头

function createTree (mdArr) {
  let _htmlPool  = {};
  let _lastMark = '';
  let _key = 0;
  mdArr.forEach(mdFragment => {
    // console.log('===========mdFragment===========');
    // console.log(mdFragment);
    const matched = mdFragment.match(reg_mark);
    // console.log('===========matched===========');
    // console.log(matched);
    if (matched) {
      const mark = matched[1];
      const input = matched['input']
      if (reg_sharp.test(mark)) { // # 号开头的
        // console.log('===========mark===========');
        // console.log(mark);
        const tag = `h${mark.length}`;
        const tagContent = input.replace(reg_mark, '');
        _lastMark = mark;
        _key = randomNum();
        _htmlPool[`${tag}-${_key}`] = {
          type: 'single',
          tags: [`<${tag}>${tagContent}</${tag}>`]
        }
      }

      if (reg_crossbar.test(mark)) { // - 号开头的
        const tag = 'li';
        const tagContent = input.replace(reg_mark, '');
        if (reg_crossbar.test(_lastMark)) {
          _htmlPool[`ul-${_key}`].tags = [..._htmlPool[`ul-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          _lastMark = mark;
          _key = randomNum();
          _htmlPool[`ul-${_key}`] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }

      if (reg_number.test(mark)) { // 数字开头的
        const tag = 'li';
        const tagContent = input.replace(reg_mark, '');
        if (reg_number.test(_lastMark)) {
          _htmlPool[`ol-${_key}`].tags = [..._htmlPool[`ol-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          _lastMark = mark;
          _key = randomNum();
          _htmlPool[`ol-${_key}`] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
    }
  })
  console.log('===========_htmlPool===========');
  console.log(_htmlPool);
  return _htmlPool
}
/**
{
  h1: {
    tag: '<h1>这是一个h1标签</h1>'
  }
}
 */
/**
{
  h1: {
    type: 'single',
    tag: '<h1>这是一个h1标签</h1>'
  },
  ul: {
    type: 'wrap',
    tag: '<li>这是ul列表第1项</li>'
  }
}
*/
/**
{
  h1: {
    type: 'single',
    tag: ['<h1>这是一个h1标签</h1>']
  },
  ul: {
    type: 'wrap',
    tag: [
      '<li>这是ul列表第1项</li>',
      '<li>这是ul列表第2项</li>',
      '<li>这是ul列表第3项</li>',
      '<li>这是ul列表第4项</li>',
      '<li>这是ul列表第5项</li>',
    ]
  }
}
 */

/**
{
  h1-randomNum: {
    type: 'single',
    tag: ['<h1>这是一个h1标签</h1>']
  },
  ul-randomNum: {
    type: 'wrap',
    tag: [
      '<li>这是ul列表第1项</li>',
      '<li>这是ul列表第2项</li>',
      '<li>这是ul列表第3项</li>',
      '<li>这是ul列表第4项</li>',
      '<li>这是ul列表第5项</li>',
    ]
  },
  h1-randomNum: {
    type: 'single',
    tag: ['<h1>这是一个h1标签</h1>']
  },
}
 */