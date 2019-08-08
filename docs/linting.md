# 代码规范

## Linting

目前项目中包含了以下几种代码规范 lint 工具，对各种文件作了较大范围的规范：

- [ESLint](https://eslint.org)： 规范 JavaScript 脚本
- [MarkdownLint](https://github.com/markdownlint/markdownlint)： 规范 Markdown 文件
- [StyleLint](https://stylelint.io)： 规范样式文件

在支持这些 lint 工具的编辑器中，会自动对不符合规则的代码做出标注。

### ESLint

ESLint 配置文件为 `.eslintrc.js` ，规范使用了 [Standard](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md) 和 [Vue ESLint](https://github.com/vuejs/eslint-plugin-vue#bulb-rules) 。

::: warning Prettier 与 Standard

由于使用了 [Prettier](#prettier) 作为代码格式化工具，格式化后会删除函数括号前的空格，与 Standard 默认的规范有冲突，因此先关闭了 `space-before-function-paren` 这个规则的判断。

相关详情可查看 [Space after function keyword in anonymous functions](https://github.com/prettier/prettier/issues/3847) 。

:::

### MarkdownLint

MarkdownLint 配置文件为 `.markdownlintrc` ，规范了中的 Markdown 文件，如 Readme 等相关的文档。

### StyleLint

StyleLint 配置文件为 `stylelint.config.js` ，规范了样式文件的编码风格。

## 提交前检查

除了在开发过程中的提示，在提交 git commit 之前 ( `pre-commit` ) 会使用 [Lint Staged](https://github.com/okonet/lint-staged) 对所有需要提交的代码再最终执行一遍规范检查，检查不通过则无法提交，保证提交记录中的代码都是符合规范。

检查流程中还包括单元测试任务，具体可查阅 [单元测试](unit-test.md) 章节。

检查文件范围以及相应的检查任务可在配置文件 `lint-staged.config.js` 中查看。

## Prettier

[Prettier](https://prettier.io) 是一个支持多种语言的格式化工具，使用 [VS Code](editor.md#visual-studio-code) 进行开发时，安装本项目的推荐扩展后，在保存时会使用该工具格式化代码。

### 自动修复

在使用其他开发工具没有支持实时格式化，或项目不符合规范的文件过多导致验证未通过无法提交时，可使用下面的命令尝试自动修复。

```bash
npm run lint:all
```
