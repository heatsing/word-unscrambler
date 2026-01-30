/**
 * Build script: reads words.txt (one word per line), optionally merges a remote
 * English word list, and outputs public/data/words_{len}.json.
 * Run: npm run build:dict (or tsx scripts/build-dict.ts)
 * Set SKIP_REMOTE_DICT=1 to use only words.txt (no fetch).
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WORDS_TXT = path.join(ROOT, 'words.txt');
const OUT_DIR = path.join(ROOT, 'public', 'data');
const MIN_LEN = 2;
const MAX_LEN = 10;

/** Public domain English word list (alpha only, one per line). Tried in order. */
const REMOTE_WORDLIST_URLS = [
  'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt',
  'https://cdn.jsdelivr.net/gh/dwyl/english-words@master/words_alpha.txt',
];
/** Optional local fallback when remote fetch fails (e.g. words_alpha.txt from same repo). */
const WORDS_ALPHA_LOCAL = path.join(ROOT, 'words_alpha.txt');

/** Bundled 2–5 letter words when no remote/local list is available. */
const BUNDLED_2_5 =
  'ad am an as at be by do go he hi if in is it me my no of on or so to up us we ' +
  'ace act add age and ant are arm art ask ate bad bag ban bar bat bed bee bet big box boy bus but buy can cap car cat cup cut dad day did die dog dry eat end eye far fat few fix fly for get got gum had has hat hay hen her him his hit hot how ice its job joy key kid let lot low man map may men met mix mom mud new nod not now nut oak odd off old one our out own pad pal pan pay pen pet pie pig pin pit pop pot put rad rag ram ran rap rat raw red rid rig rip rob rod rot row rub rug run sad sap sat saw say sea see set she sit six ski sky son sow soy spa sum sun tab tad tag tan tap tar tea tee ten the tie tin tip toe ton too top tot tow toy try tub tug two use van vet via war was wax way web wed wee wet who why wig win wit won woo yes yet you zoo ' +
  'able about above abuse actor adapt added admit adopt adult after again agent agree ahead alarm album alert alike alive allow alone along alter among anger angle angry apart apple apply arena argue arise array asset audit avoid award aware badly baker basis batch beach began begin begun being below bench bible birth black blade blame blank blast blend block blood bloom board boast bonus boost booth bound brain brand brass brave bread break breed brick bride brief bring broad broke brown build built bunch burst buyer cabin cable cache cake calm camp canal candy canon cargo carry carve catch cause chain chair chalk champ chaos chart chase cheap check cheer chest chief child chill chip choice chose claim clamp class clean clear clerk click client climb clock close cloud coach coast code coil cold collect color column combo come comic commit common condo cook cool copy coral core cost couch could count court cover craft crash cream credit crew crime cross crowd crown cruel crunch crush curve cycle daily dance danger dated dawn days dead deal death debate debt decay decent decide defeat defend define delay deliver demand depend deploy depth deputy desert design desire detail detect device differ digest dinner direct dirty disagree discard discover discuss disease dismiss display dispute distance distinct divide doctor document dog dollar domain double draft drama draw dream dress drink drive drop drove drunk dry duck dull dump during dust duty each early earn earth ease east easy echo edge edit effect effort eight elect email empty enable enact end energy engage engine enjoy enough enter entire entry equal error essay estate ethic event every exact exam exceed excel except excess exchange excite excuse exist exit expand expect expert export extra extreme fabric face fact fail fair faith false fame family fancy fare farm fast fat fault favor fear feed feel fell felt few field fight figure file fill film final find fine finger finish fire firm first fish fit five fix flag flame flash flat flavor flee fleet flesh float flood floor flow flower fluid flush focus fold folk follow food foot force forest forget form forth forty forum found frame fresh friend front fruit fuel full fully fund funny gain game gap gate gather gear gene general ghost gift give given glad glass global glory glow go goal god gold golf good got govern grab grade grain grand grant grape graph grasp grass grave great green grey grid grief grill grip gross group grow growth guard guess guest guide guilt guitar gun habit half hall hand hang happen happy hard hardly harm hat hate have head health hear heart heat heavy hell hello help hence hero hide high hill hire history hit hold hole holiday hollow home hope horse hospital host hot hotel hour house how huge human humor hundred hunt hurry hurt husband idea ideal identify idle image impact import improve in inch include income index indoor infant inform initial inject injury inner input insect inside insist install intact intend interest interior internal into invest invite involve iron island issue item jacket jam java jazz jeans joint joke journal joy judge juice jump junior just keep key kick kid kill kind king kiss kitchen knee knew knife knock know lab label labor lack lady lake land lane language lap large last late later laugh law lay lead leader league lean learn least leave left leg legal length less lesson let letter level liar license lie life lift light like limit line link list listen little live load loan local lock lodge log logic long look loop lord lose loss lot love low luck lunch lung machine mad made magic mail main major make male mall man manage manner many map march mark market marriage mass master match matter may maybe meal mean meant measure meat media medical meeting member memory mental menu mere message metal meter method middle might mile milk mind mine minor minute miss mix mobile mode model modern moment money month mood moon more morning most mother motor mount mouse mouth move movie much mud muscle museum music must mutual my myself nail name narrow nation native natural nature near nearly necessary neck need needle negotiate neighbor neither nerve never new news next nice night nine no nobody node none nor north nose not note nothing notice novel now nowhere number nurse nut object observe obtain obvious occur ocean odd offer office often oil ok old older omit on once one only onto open opera opinion opportunity opposite or orange order organ origin other others ought our ourselves out outcome outside over overall own owner oxygen pack page pain paint pair palace pale panel panic pants paper parent park part partner party pass past path patient pattern pause pay peace peak peer pen pencil people pepper per perfect perform perhaps period person phase phone photo phrase piano pick picture piece pig pile pilot pin pink pipe pitch place plan plane planet plant plate play player please plus pocket point pole police policy pool poor pop popular port position possible post pot potato pound pour power practice prefer prepare present press pretty prevent price pride primary print prior private prize probably problem process produce product profile profit program project promise promote proof proper property protect proud prove provide public pull pulse pump punch purchase pure purpose push put quarter queen question quick quiet quit quite quote race radio rain raise range rank rapid rare rate rather raw reach read ready real reality reason receive recent record recover red reduce refer reflect refuse regard region relate relax release remain remember remove render repair repeat replace reply report represent request require rescue research resist resolve resource respect respond rest result return reveal review reward rhythm rich ride ridge right ring rise risk river road rock role roll roof room root rope rose round route row royal rub rule run rush sad safe sail salt same sample sand satisfy save say scale scene schedule scheme school science score screen script sea search season seat second secret section secure see seek seem select self sell send sense series serve service session set settle seven several severe sex shade shake shall shame shape share sharp she sheet shelf shell shelter shift shine ship shirt shock shoe shoot shop short shot should shoulder shout show shut side sight sign silver simple since sing single sink sir sister sit site six size skill skin sky sleep slide slight slip slow small smart smell smile smoke smooth snake snap snow so soap soccer social soft soil soldier solution solve some someone something sometimes son song soon sort sound source south space speak special speed spell spend spirit split sport spot spread spring square stable stage stair stamp stand star start state stay steal steam step stick still stock stone stop store story straight strange strategy street strength stretch strike string strong structure struggle student study stuff style subject submit success such sudden suffer sugar suggest suit summer sun super supply support sure surface surprise surround survey suspect sustain swallow swap swear sweep sweet swim swing switch symbol system table tail take tale talk tall tank tap target task taste tax tea teach team tear tech tell ten tend term test text than thank that the their them then theory there these they thick thin thing think third this those though thought thousand thread three throw thumb ticket tie tight till time tiny tip tire title to today toe together token tomorrow ton tone tongue tonight too tool tooth top topic total touch tough tour toward tower town track trade traffic trail train transfer transform translate travel treat tree trend trial trick trip trouble truck true trust truth try tube tune turn twice twin twist two type typical ugly uncle under understand unit unite universal universe university unless unlike until up upon upper urban urge us use used useful user usual usually valley valuable value van variable variety various vary vast vegetable vehicle venture version very vessel veteran via victim view village virtual virus visit visual vital vitamin voice volume vote wage wait wake walk wall want war warm warn wash watch water wave way we weak wealth weapon wear weather web wedding week weight welcome well west wet what whatever wheel when where which while white who whole whom whose why wide wife will win wind window wine wing winner winter wire wisdom wise wish with within without witness woman wonder wood word work worker world worry worth would wrap write writer wrong yard year yellow yes yesterday yet you young your youth zero zone zoo';
/** Bundled 6–10 letter words when no remote/local list is available (common game words). */
const BUNDLED_6_10 =
  'action active actual address advantage animal answer anyone around attack author become before better brother button camera center change character children company concern consider contact content country create current develop different director example experience family general history however important include increase interest language machine manager meaning meeting member morning natural nothing number office parent pattern people person picture planter popular position practice present president problem process product project purpose quality question receive recent remember result science service several society special strategy structure student subject success system teacher through together training various welcome western whether without worker working world would writer ' +
  'ability accept across almost always amount animal annual answer anyone appear around artist assume attack author become before behind believe better between beyond border brother budget button camera center chance change charge choice circle client common concern consider contact course create credit crisis custom demand design desire direct effect entire expect export figure follow former friend future garden global ground growth happen health impact import income insert invest island leader letter likely little manage market matter member memory middle minute modern moment mother nation nature notice number office option parent period person planter picture policy power practice present prevent price product project proper public purpose rather reason recent record result return season second select series server simple single source spirit spring square standard station street strong structure student subject summer supply system teacher theory thing third though thought today toward travel trouble union unique united unless volume window winter within wonder worker';

const BUNDLED_ALL = (BUNDLED_2_5 + ' ' + BUNDLED_6_10).split(/\s+/).filter(Boolean);

function normalize(word: string): string {
  return word.trim().toLowerCase().replace(/[^a-z]/g, '');
}

function collectByLength(words: string[], byLen: Record<number, string[]>): void {
  for (const w of words) {
    const n = normalize(w);
    if (n.length < MIN_LEN || n.length > MAX_LEN) continue;
    if (!byLen[n.length]) byLen[n.length] = [];
    if (!byLen[n.length].includes(n)) byLen[n.length].push(n);
  }
}

function loadLocalWordsAlpha(): string[] {
  if (!fs.existsSync(WORDS_ALPHA_LOCAL)) return [];
  try {
    const text = fs.readFileSync(WORDS_ALPHA_LOCAL, 'utf-8');
    return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

async function fetchRemoteWords(): Promise<string[]> {
  if (process.env.SKIP_REMOTE_DICT === '1') {
    const local = loadLocalWordsAlpha();
    if (local.length > 0) return local;
    if (BUNDLED_ALL.length > 0) console.log('Using bundled 2–10 letter words (' + BUNDLED_ALL.length + ' words).');
    return BUNDLED_ALL;
  }
  for (const url of REMOTE_WORDLIST_URLS) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!res.ok) continue;
      const text = await res.text();
      const words = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (words.length > 1000) {
        console.log('Fetched', words.length, 'words from remote list.');
        return words;
      }
    } catch (_) {
      continue;
    }
  }
  console.warn('Could not fetch remote word list. Use local words_alpha.txt or run: npx tsx scripts/download-words-alpha.ts');
  const local = loadLocalWordsAlpha();
  if (local.length > 0) {
    console.log('Using local words_alpha.txt (' + local.length + ' lines).');
    return local;
  }
  if (BUNDLED_ALL.length > 0) console.log('Using bundled 2–10 letter words (' + BUNDLED_ALL.length + ' words).');
  return BUNDLED_ALL;
}

async function main(): Promise<void> {
  const byLen: Record<number, string[]> = {};
  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (!fs.existsSync(WORDS_TXT)) {
    console.warn('words.txt not found at', WORDS_TXT);
    console.warn('Creating a minimal sample words.txt and public/data/ for demo.');
    const sample = [
      'ad', 'am', 'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'hi', 'if', 'in', 'is', 'it', 'me', 'my', 'no', 'of', 'on', 'or', 'so', 'to', 'up', 'us', 'we',
      'ace', 'act', 'add', 'age', 'and', 'ant', 'are', 'arm', 'art', 'ask', 'ate', 'bad', 'bag', 'ban', 'bar', 'bat', 'bed', 'bee', 'bet', 'big', 'box', 'boy', 'bus', 'but', 'buy', 'can', 'cap', 'car', 'cat', 'cup', 'cut', 'dad', 'day', 'did', 'die', 'dog', 'dry', 'eat', 'end', 'eye', 'far', 'fat', 'few', 'fix', 'fly', 'for', 'get', 'got', 'gum', 'had', 'has', 'hat', 'hay', 'hen', 'her', 'him', 'his', 'hit', 'hot', 'how', 'ice', 'its', 'job', 'joy', 'key', 'kid', 'let', 'lot', 'low', 'man', 'map', 'may', 'men', 'met', 'mix', 'mom', 'mud', 'new', 'nod', 'not', 'now', 'nut', 'oak', 'odd', 'off', 'old', 'one', 'our', 'out', 'own', 'pad', 'pal', 'pan', 'pay', 'pen', 'pet', 'pie', 'pig', 'pin', 'pit', 'pop', 'pot', 'put', 'rad', 'rag', 'ram', 'ran', 'rap', 'rat', 'raw', 'red', 'rid', 'rig', 'rip', 'rob', 'rod', 'rot', 'row', 'rub', 'rug', 'run', 'sad', 'sap', 'sat', 'saw', 'say', 'sea', 'see', 'set', 'she', 'sit', 'six', 'ski', 'sky', 'son', 'sow', 'soy', 'spa', 'sum', 'sun', 'tab', 'tad', 'tag', 'tan', 'tap', 'tar', 'tea', 'tee', 'ten', 'the', 'tie', 'tin', 'tip', 'toe', 'ton', 'too', 'top', 'tot', 'tow', 'toy', 'try', 'tub', 'tug', 'two', 'use', 'van', 'vet', 'via', 'war', 'was', 'wax', 'way', 'web', 'wed', 'wee', 'wet', 'who', 'why', 'wig', 'win', 'wit', 'won', 'woo', 'yes', 'yet', 'you', 'zoo',
    ];
    fs.writeFileSync(WORDS_TXT, sample.join('\n'), 'utf-8');
    collectByLength(sample, byLen);
    const remote = await fetchRemoteWords();
    if (remote.length > 0) {
      console.log('Merging', remote.length, 'remote words into dictionary.');
      collectByLength(remote, byLen);
    }
    for (let len = MIN_LEN; len <= MAX_LEN; len++) {
      const arr = (byLen[len] ?? []).sort();
      const outPath = path.join(OUT_DIR, `words_${len}.json`);
      fs.writeFileSync(outPath, JSON.stringify(arr), 'utf-8');
      console.log('Wrote', outPath, '(' + arr.length + ' words)');
    }
    return;
  }

  const content = fs.readFileSync(WORDS_TXT, 'utf-8');
  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  collectByLength(lines, byLen);

  const remote = await fetchRemoteWords();
  if (remote.length > 0) {
    console.log('Merging', remote.length, 'remote words (words_alpha) for full 2–10 letter coverage.');
    collectByLength(remote, byLen);
  }

  for (let len = MIN_LEN; len <= MAX_LEN; len++) {
    const arr = (byLen[len] ?? []).sort();
    const outPath = path.join(OUT_DIR, `words_${len}.json`);
    fs.writeFileSync(outPath, JSON.stringify(arr), 'utf-8');
    console.log('Wrote', outPath, '(' + arr.length + ' words)');
  }
}

main();
