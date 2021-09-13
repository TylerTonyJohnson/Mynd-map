const source = "That's cock-a-leakie. Hmm, self-saucing. That's absolutely scrummy. I don't know when I've enjoyed bread more. Every layer must be soaked completely. The flavor's there, but the texture, not so much. Oh crumbs. Derriere comme un peche. It's a nice sponge. So far, so good. A little bit of o-ray-gon-oh. We need even laaaeyhs. There's many things that can go wrong. One thing wrong and it will be total disaster. Scrumptious."

const sayings = [
    "That's cock-a-leakie.",
    "Hmm, self-saucing.",
    "That's absolutely scrummy.",
    "I don't know when I've enjoyed bread more.",
    "Every layer must be soaked completely.",
    "The flavor's there, but the texture, not so much.",
    "Oh crumbs.",
    "Derriere comme un peche.",
    "It's a nice sponge.",
    "So far, so good.",
    "A little bit of o-ray-gon-oh.",
    "We need even laaaeyhs.",
    "There's many things that can go wrong.",
    "One thing wrong and it will be total disaster.",
    "Scrumptious.",
    "Calm on top, paddling like Biddlio underneath.",
    "We can't have a soggy bottom.",
    "Not a clue, not a Scooby-Doo.",
    "BAVAROIS.",
    "I wonder how old she is now.",
    "The flavor - gorgeous.",
    "We have our star baker.",
    "Exceptional.",
    "Choux.",
    "Creme pat.",
    "Bread.",
    "Mary and Paul would like you very much please.",
    "Tatty-byes.",
    "Spread it out with the old spatch."
]

const words = source.split(" ");
let sentences = indexes(words);

sentences.unshift(words[0]);
sentences.pop();

function indexes(source) {
    let output = [];

    for (let i = 0; i < source.length; i++) {
        if (source[i].indexOf(".") !== -1) {
            output.push(source[i + 1]);
        }
    }

    return output;
}

function lorem(wordcount) {
    let random = Math.floor(Math.random() * sentences.length);
    let max = words.length - wordcount;

    if (random > max) {
        lorem(wordcount);
    }

    let start = sentences[random];
    let pos = words.indexOf(start);
    let output = [];

    for (let i = pos; i < pos + wordcount; i++) {
        output.push(words[i]);
    }

    return output.join(" ");
    // document.write(output.join(" "));
}