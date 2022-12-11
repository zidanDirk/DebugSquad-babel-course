const acorn = require("acorn");

const Parser = acorn.Parser;
const TokenType = acorn.TokenType;

Parser.acorn.keywordTypes["eva"] = new TokenType("eva",{keyword: "eva"});

module.exports = function(Parser) {
  return class extends Parser {
    parse(program) {
      let newKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super";
      newKeywords += " eva";
      this.keywords = new RegExp("^(?:" + newKeywords.replace(/ /g, "|") + ")$")
      return(super.parse(program));
    }

    parseStatement(context, topLevel, exports) {
      var starttype = this.type;

      if (starttype == Parser.acorn.keywordTypes["eva"]) {
        var node = this.startNode();
        return this.parseEvaStatement(node);
      }
      else {
        return(super.parseStatement(context, topLevel, exports));
      }
    }

    parseEvaStatement(node) {
      this.next();
      return this.finishNode({value: 'eva'},'evaStatement');//新增加的ssh语句
    };
  }
}
