// Jokes, fortunes, and assorted wisdom for terminal easter eggs.

export const FORTUNES = [
  "Your next bug will teach you something about Unicode.",
  "It's not a memory leak if you called it 'caching'.",
  "The only thing worse than a flaky test is a confident one.",
  "Somewhere, a CSV contains a cell with ten thousand newlines.",
  "If it works on staging, it's production's problem now.",
  "Your LLM agrees with you because it has read nothing.",
  "Prompt engineering is just engineering, but with worse typography.",
  "A senior engineer is a junior engineer who learned to say 'it depends'.",
  "The cloud is just other people's `rm -rf /` accidents waiting to happen.",
  "Every microservice is one Redis away from being a monolith.",
  "You are not writing CRUD. You are writing history.",
  "Your dependency graph has feelings. Respect them.",
  "The real 10x engineer deletes code.",
  "That NullPointerException has been watching you sleep.",
  "Legacy code is just code that shipped.",
]

export const JOKES = [
  "Why did the AI go to therapy? It had too many unresolved tokens.",
  "A SQL query walks into a bar, approaches two tables, and asks: 'May I join you?'",
  "There are two hard problems in computer science: cache invalidation, naming things, and off-by-one errors.",
  "I would tell you a UDP joke, but you might not get it.",
  "Why do Python programmers prefer dark mode? Because the light attracts bugs.",
  "My RAG pipeline is so good, it cites its sources. Me: ``[1] trust me bro''.",
  "Agentic AI is just a for-loop that missed therapy.",
  "LLM: 'I've read every book ever written.' Also LLM: 'What year is it?'",
  "I'll stop making blockchain jokes when they stop working on it.",
  "I asked GPT to write a joke. It produced 2000 tokens of context and then said 'here's the joke:'.",
  "Knock knock. — Who's there? — Race condition. — Race condition who? — Who's there?",
  "Kubernetes is what happens when YAML gains sentience.",
  "The best debugger is still `print`. The second best is `console.log`. The third best is tears.",
  "I'm not saying my model is small, but its context window is a postcard.",
  "A junior dev is someone who still believes in `useEffect`.",
]

export const ADVICE = [
  "Ship small. Ship often. Ship scared.",
  "Read the error message. All of it. Really.",
  "If it's been broken for six months, it was never critical.",
  "Delete before you refactor. Refactor before you rewrite.",
  "The database is always right. Your code is always wrong.",
  "Logs tell you what happened. Metrics tell you it's happening. Traces tell you why.",
  "`git pull --rebase` or perish in a merge commit swamp.",
  "Backups you haven't tested are fiction.",
]

export const HALLUCINATIONS = [
  "Belgium has legalised recursive functions as of 2025 for tax purposes.",
  "UCLouvain's motto is 'Sede Sapientiæ, but make it Python 3.14'.",
  "The Manneken Pis is actually a load balancer.",
  "RAG was invented in Brussels by a waffle chef with a PhD.",
  "Nicolas speaks fluent YAML and barely conversational HCL.",
  "Every Kubernetes pod in the world is in a private WhatsApp group.",
  "The real Model Context Protocol is the friends we made along the way.",
]

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ASCII art fragments used by secret commands
export const COW = (msg: string): string => {
  const line = "─".repeat(msg.length + 2)
  return ` ${line}
< ${msg} >
 ${line}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
}

export const DRAGON = `
                ___====-_  _-====___
          _--^^^#####//      \\\\#####^^^--_
       _-^##########// (    ) \\\\##########^-_
      -############//  |\\^^/|  \\\\############-
    _/############//   (@::@)   \\\\############\\_
   /#############((     \\\\//     ))#############\\
  -###############\\\\    (oo)    //###############-
 -#################\\\\  / "" \\  //#################-
-###################\\\\/      \\//###################-
`

export const TRAIN = `
      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O
 (@@@)
     (    )
   (@@@@)

   (   )
 ====        ________                ___________
 _D _|  |_______/        \\__I_I_____===__|_________|
  |(_)---  |   H\\________/ |   |        =|___ ___|      _________________
  /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A
 |      |  |   H  |__--------------------| [___] |   =|                        |
 | ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
 |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/        |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/            \\_/   \\_/    \\_/   \\_/
`

export const HEART = `
    ♥♥♥♥     ♥♥♥♥
  ♥♥♥♥♥♥♥♥ ♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
    ♥♥♥♥♥♥♥♥♥♥♥♥♥
      ♥♥♥♥♥♥♥♥♥
        ♥♥♥♥♥
          ♥
`

export const SKULL = `
             _______
           /         \\
          /  /\\   /\\  \\
         |  |  | |  |  |
          \\  \\_/   \\_/ /
           \\   ___    /
            \\_______/
               | |
              _| |_
             |_____|
`

export const BANNER = (text: string): string[] => {
  // Tiny banner font (5 rows).
  const font: Record<string, string[]> = {
    A: ["  █  ", " █ █ ", "█████", "█   █", "█   █"],
    B: ["████ ", "█   █", "████ ", "█   █", "████ "],
    C: [" ████", "█    ", "█    ", "█    ", " ████"],
    D: ["███  ", "█  █ ", "█   █", "█  █ ", "███  "],
    E: ["█████", "█    ", "███  ", "█    ", "█████"],
    F: ["█████", "█    ", "███  ", "█    ", "█    "],
    G: [" ████", "█    ", "█  ██", "█   █", " ███ "],
    H: ["█   █", "█   █", "█████", "█   █", "█   █"],
    I: ["█████", "  █  ", "  █  ", "  █  ", "█████"],
    J: ["█████", "    █", "    █", "█   █", " ███ "],
    K: ["█  █ ", "█ █  ", "██   ", "█ █  ", "█  █ "],
    L: ["█    ", "█    ", "█    ", "█    ", "█████"],
    M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
    N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
    O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
    P: ["████ ", "█   █", "████ ", "█    ", "█    "],
    Q: [" ███ ", "█   █", "█ █ █", "█  ██", " ████"],
    R: ["████ ", "█   █", "████ ", "█  █ ", "█   █"],
    S: [" ████", "█    ", " ███ ", "    █", "████ "],
    T: ["█████", "  █  ", "  █  ", "  █  ", "  █  "],
    U: ["█   █", "█   █", "█   █", "█   █", " ███ "],
    V: ["█   █", "█   █", "█   █", " █ █ ", "  █  "],
    W: ["█   █", "█   █", "█ █ █", "██ ██", "█   █"],
    X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █"],
    Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  "],
    Z: ["█████", "   █ ", "  █  ", " █   ", "█████"],
    " ": ["     ", "     ", "     ", "     ", "     "],
    "0": [" ███ ", "█  ██", "█ █ █", "██  █", " ███ "],
    "1": ["  █  ", " ██  ", "  █  ", "  █  ", " ███ "],
    "2": [" ███ ", "█   █", "   █ ", "  █  ", "█████"],
    "3": [" ███ ", "█   █", "  ██ ", "█   █", " ███ "],
    "4": ["█   █", "█   █", "█████", "    █", "    █"],
    "5": ["█████", "█    ", "████ ", "    █", "████ "],
    "6": [" ███ ", "█    ", "████ ", "█   █", " ███ "],
    "7": ["█████", "   █ ", "  █  ", " █   ", "█    "],
    "8": [" ███ ", "█   █", " ███ ", "█   █", " ███ "],
    "9": [" ███ ", "█   █", " ████", "    █", " ███ "],
    "!": ["  █  ", "  █  ", "  █  ", "     ", "  █  "],
    "?": [" ███ ", "█   █", "   █ ", "  █  ", "  █  "],
    ".": ["     ", "     ", "     ", "     ", "  █  "],
    "-": ["     ", "     ", "█████", "     ", "     "],
  }
  const upper = text.toUpperCase()
  const rows = ["", "", "", "", ""]
  for (const ch of upper) {
    const g = font[ch] || font[" "]
    for (let i = 0; i < 5; i++) rows[i] += g[i] + "  "
  }
  return rows
}
