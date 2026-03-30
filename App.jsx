import { useState, useEffect } from "react";

const C = {
  bg:"#0f0f12", surface:"#1a1a22", card:"#22222e", border:"#2e2e3e",
  accent:"#b8956a", text:"#e8e4dc", muted:"#8a8490",
  gutLight:"#c47a6a", heartLight:"#b47a9a", headLight:"#6a9aba"
};
const typeColors = {1:"#6b3a3a",2:"#5a3a6b",3:"#5a3a6b",4:"#5a3a6b",5:"#2a4a6b",6:"#2a4a6b",7:"#2a4a6b",8:"#6b3a3a",9:"#6b3a3a"};
const typeLightColors = {1:"#c47a6a",2:"#b47a9a",3:"#b47a9a",4:"#b47a9a",5:"#6a9aba",6:"#6a9aba",7:"#6a9aba",8:"#c47a6a",9:"#c47a6a"};
const centerBg = {gut:"rgba(107,58,58,0.08)",heart:"rgba(90,58,107,0.08)",head:"rgba(42,74,107,0.08)"};

const T = {
  1:{name:"The Reformer",alias:"The Perfectionist",center:"gut",core_desire:"To be good, ethical, and have integrity",core_fear:"Being corrupt, defective, or evil",wound:"I am only worthy if I am good and correct.",passion:"Anger (held inward as resentment)",virtue:"Serenity",healthy:"Wise, discerning, principled, accepting of imperfection in self and others",average:"Critical, perfectionistic, judgmental, driven by an inner critic",unhealthy:"Rigid, self-righteous, punishing -- the inner critic becomes unbearable",stress:4,security:7,wings:[9,2],rohr:"Ones are the reformers of the world, but the reform must begin within. Rohr notes that Ones carry a deep sense of original sin -- not as theology, but as lived experience. They feel the gap between what is and what should be as a personal wound.",stabile:"Stabile emphasizes that Ones do not just see what is wrong -- they feel responsible for fixing it. Their anger is rarely expressed openly; it leaks out as frustration, impatience, and a tone that says you could do better.",cron:"Cron describes the One's inner world as a courtroom where they are simultaneously the defendant, the prosecutor, and the harshest judge. The path forward is learning to extend to themselves the grace they often extend to others.",riso:"Riso and Hudson write that healthy Ones are extraordinarily principled and fair. The trap is that their inner critic becomes their primary lens, and they begin to see everything -- including themselves -- as a problem to be corrected.",integration:"Move toward Type 7: become spontaneous, joyful, and able to rest in what is good rather than what is perfect.",disintegration:"Move toward Type 4: become moody, withdrawn, and convinced they are uniquely flawed."},
  2:{name:"The Helper",alias:"The Giver",center:"heart",core_desire:"To be loved and wanted",core_fear:"Being unloved, unwanted, or dispensable",wound:"I am only worthy if I am needed.",passion:"Pride (in being indispensable)",virtue:"Humility",healthy:"Warm, genuinely caring, emotionally attuned, able to receive as well as give",average:"People-pleasing, flattering, over-involved, unaware of their own needs",unhealthy:"Manipulative, possessive, martyr-like -- love becomes a transaction",stress:8,security:4,wings:[1,3],rohr:"Rohr writes that Twos often do not know what they want or feel because they have spent so long attending to others. The spiritual invitation is to ask: what do I need? And to learn that love cannot be earned.",stabile:"Stabile reminds us that Twos alter themselves for each relationship. This is not manipulation; it is a survival strategy born of the belief that the real self is not enough.",cron:"Cron describes Twos as people who give to get, not out of malice but out of deep unconscious need. The healing comes when they discover they are loved not for what they do but for who they are.",riso:"Riso and Hudson observe that Twos at their best are genuinely altruistic. But the shadow side is a pride that refuses to acknowledge its own needs, creating a cycle of giving that secretly demands return.",integration:"Move toward Type 4: connect with their own feelings, needs, and authentic self apart from relationships.",disintegration:"Move toward Type 8: become aggressive, demanding, and controlling when their giving goes unacknowledged."},
  3:{name:"The Achiever",alias:"The Performer",center:"heart",core_desire:"To be valuable and worthwhile",core_fear:"Being worthless or without value",wound:"I am only worthy if I succeed.",passion:"Deceit (self-deception about who they are beneath the image)",virtue:"Authenticity",healthy:"Competent, inspiring, self-assured, able to be seen without their achievements",average:"Image-conscious, competitive, workaholic, shapeshifting to fit the audience",unhealthy:"Exploitative, narcissistic, willing to harm others to maintain status",stress:9,security:6,wings:[2,4],rohr:"Rohr says Threes are the most American of the types -- success, image, and productivity are cultural gods, making Threes both celebrated and spiritually asleep. The contemplative path asks: who are you when you fail?",stabile:"Stabile notes that Threes are often so identified with their roles and achievements that they genuinely do not know who they are outside of them. Feelings are set aside as inefficient.",cron:"Cron describes the Three's wound as the disappearance of the self. Somewhere in childhood they learned that love followed achievement, and so the performing self eclipsed the real self.",riso:"Riso and Hudson note that Threes are the shape-shifters of the Enneagram -- extraordinarily adaptable and effective, but at the cost of losing contact with who they actually are.",integration:"Move toward Type 6: become loyal, committed, and willing to be vulnerable within community rather than performing for it.",disintegration:"Move toward Type 9: disengage, go numb, and lose all motivation when the performance feels unsustainable."},
  4:{name:"The Individualist",alias:"The Romantic",center:"heart",core_desire:"To find themselves and their significance",core_fear:"Having no identity or personal significance",wound:"Something is fundamentally missing in me.",passion:"Envy (longing for what others seem to have naturally)",virtue:"Equanimity",healthy:"Creative, emotionally honest, self-aware, able to find beauty in the ordinary",average:"Melancholic, self-absorbed, disdainful of the ordinary, romanticizing suffering",unhealthy:"Self-destructive, alienated, convinced they are uniquely and irreparably broken",stress:2,security:1,wings:[3,5],rohr:"Rohr writes that Fours live in a permanent state of longing. The spiritual gift is their emotional depth; the trap is using that depth as a reason to stay in the wound.",stabile:"Stabile says Fours have a push-pull dynamic in relationships: they want intimacy but push people away when they get too close, then feel abandoned.",cron:"Cron describes Fours as people who feel they arrived in the world missing something everyone else received. The path is learning that the ordinary, fully inhabited, is sacred.",riso:"Riso and Hudson write that Fours are the most emotionally honest type -- and the most prone to mistaking their emotional state for their identity.",integration:"Move toward Type 1: become principled, disciplined, and able to act on their values rather than drowning in feeling.",disintegration:"Move toward Type 2: become clingy, needy, and manipulative when the longing becomes unbearable."},
  5:{name:"The Investigator",alias:"The Observer",center:"head",core_desire:"To be competent and capable",core_fear:"Being incompetent, ignorant, or overwhelmed by the world",wound:"The world demands too much. I must conserve and protect what is mine.",passion:"Avarice (hoarding of energy, knowledge, time)",virtue:"Non-attachment",healthy:"Perceptive, innovative, clear-minded, generous with their knowledge and presence",average:"Withdrawn, secretive, detached, living more in the mind than in life",unhealthy:"Isolated, nihilistic, cut off from the body and from others entirely",stress:7,security:8,wings:[4,6],rohr:"Rohr writes that Fives withdraw from life in order to understand it -- but understanding is not the same as living. The spiritual challenge is to participate, to risk being depleted, trusting that the well refills.",stabile:"Stabile emphasizes that Fives compartmentalize everything. This is not coldness; it is self-protection. They fear being engulfed.",cron:"Cron describes Fives as people who feel like perpetual outsiders -- watching life from a window rather than living it. The invitation is to step through the glass.",riso:"Riso and Hudson describe Fives as the most intellectually curious type. The shadow is that they can retreat so far into the mind that they become disconnected from their own bodies and emotions.",integration:"Move toward Type 8: become confident, decisive, and willing to take up space and act in the world.",disintegration:"Move toward Type 7: scatter into hyperactive, unfocused anxiety when the internal world becomes too heavy."},
  6:{name:"The Loyalist",alias:"The Skeptic",center:"head",core_desire:"To have security and support",core_fear:"Being without support, abandoned, or facing the world alone",wound:"I cannot trust myself -- or anyone else -- completely.",passion:"Fear (chronic anxiety and doubt)",virtue:"Courage",healthy:"Faithful, responsible, witty, able to trust their own inner authority",average:"Anxious, suspicious, seeking reassurance, testing loyalty in others",unhealthy:"Paranoid, self-defeating, panicked -- or swinging to reckless counterphobic behavior",stress:3,security:9,wings:[5,7],rohr:"Rohr notes that Sixes struggle with authority because the true inner authority feels untrustworthy. The contemplative path is learning to find the still, trustworthy center within.",stabile:"Stabile points out that Sixes are the most likely type to be counterphobic -- running toward what they fear to prove they are not afraid. Both the anxious Six and the counterphobic Six are driven by the same underlying terror.",cron:"Cron describes Sixes as the most loyal people on the Enneagram -- and the most prone to scanning for betrayal. The healing is trusting the voice inside.",riso:"Riso and Hudson note that Sixes are the most common type. Their anxiety is not weakness; it is the byproduct of a sensitive system scanning for danger. At their best, they are the most courageous people alive.",integration:"Move toward Type 9: find inner peace, trust, and the ability to rest without vigilance.",disintegration:"Move toward Type 3: become image-obsessed and competitive when anxiety pushes them to prove their worth."},
  7:{name:"The Enthusiast",alias:"The Epicure",center:"head",core_desire:"To be satisfied and content",core_fear:"Being deprived, trapped, or in pain",wound:"The world will not give me what I need -- I must get it myself.",passion:"Gluttony (for experience, stimulation, options)",virtue:"Sobriety",healthy:"Joyful, grateful, focused, able to be fully present in one experience",average:"Scattered, impulsive, avoiding pain through constant stimulation and planning",unhealthy:"Addictive, manic, irresponsible -- escape from pain becomes the only goal",stress:1,security:5,wings:[6,8],rohr:"Rohr writes that Sevens are the eternal children of the Enneagram -- gifted with wonder, cursed by their inability to stay. The spiritual path is learning that depth, not breadth, is where God is found.",stabile:"Stabile describes Sevens as people who reframe everything negative into something positive -- not dishonestly, but as a survival strategy. The shadow is that real pain never gets processed.",cron:"Cron says Sevens are the most fun people in the room and often the loneliest. They keep moving so they never have to feel the emptiness underneath.",riso:"Riso and Hudson write that Sevens are the most future-oriented type. The trap is that the future becomes a way of avoiding the present, and the present is where life and healing actually happens.",integration:"Move toward Type 5: become focused, contemplative, and able to go deep in one area rather than wide across everything.",disintegration:"Move toward Type 1: become critical, rigid, and perfectionistic when the options run out and the pain catches up."},
  8:{name:"The Challenger",alias:"The Protector",center:"gut",core_desire:"To protect themselves and determine their own course",core_fear:"Being controlled, harmed, or violated by others",wound:"The world is hard. You must be harder.",passion:"Lust (intensity, excess, the need to impact)",virtue:"Innocence",healthy:"Powerful, protective, direct, able to reveal their vulnerability and tenderness",average:"Domineering, confrontational, all-or-nothing, taking up too much space",unhealthy:"Ruthless, vengeful, destructive -- strength becomes a weapon",stress:5,security:2,wings:[7,9],rohr:"Rohr calls Eights the most powerful type and the most hidden. Beneath the armor is a child who decided never to be hurt again. The spiritual invitation is to allow tenderness.",stabile:"Stabile says Eights respect strength and often do not know how to respond to vulnerability.",cron:"Cron describes the Eight's wound as a premature loss of innocence. Their tenderness is real but buried deep. The path is recovering the softness without losing the strength.",riso:"Riso and Hudson describe Eights as natural leaders who carry enormous energy and force of will. Integration means learning that surrendering control in the right moments is the deepest strength.",integration:"Move toward Type 2: become caring, emotionally open, and willing to serve without needing to control.",disintegration:"Move toward Type 5: withdraw, withhold, and isolate when the world feels too threatening."},
  9:{name:"The Peacemaker",alias:"The Mediator",center:"gut",core_desire:"To have inner stability and peace",core_fear:"Loss of connection, fragmentation, conflict",wound:"My presence does not matter. It is easier to go along.",passion:"Sloth (spiritual and psychological self-forgetting)",virtue:"Action",healthy:"Receptive, inclusive, grounded, able to assert their own presence and needs",average:"Conflict-avoidant, indecisive, merging with others, numbing through routine",unhealthy:"Completely dissociated, stubborn in their passivity, vanishing into the background",stress:6,security:3,wings:[8,1],rohr:"Rohr calls the Nine's sin sloth -- not laziness, but the sloth of the soul, the willingness to forget oneself entirely in order to keep the peace. The Nine's great work is remembering that they exist.",stabile:"Stabile notes that Nines are the most underestimated type. There is a stubbornness beneath the peace -- once dug in, they are immovable.",cron:"Cron describes the Nine's core wound as the belief that their presence does not matter. The healing is the radical act of showing up, taking a position, and refusing to disappear.",riso:"Riso and Hudson write that Nines are the most overlooked type -- and perhaps the most spiritually gifted. The shadow is that they can use this gift to avoid the harder work of claiming their own perspective.",integration:"Move toward Type 3: become goal-oriented, energized, and willing to claim their own ambitions.",disintegration:"Move toward Type 6: become anxious, suspicious, and reactive when the peace finally shatters."}
};

const triads = {
  gut:{types:[8,9,1],label:"Gut / Body Center",desc:"Driven by instinct and anger."},
  heart:{types:[2,3,4],label:"Heart / Feeling Center",desc:"Driven by emotion and image."},
  head:{types:[5,6,7],label:"Head / Thinking Center",desc:"Driven by fear and mental strategy."}
};

const triadData = {
  gut:{label:"Gut / Body Center",types:[8,9,1],color:"#c47a6a",bg:"#6b3a3a",coreEmotion:"Anger",timeOrientation:"Present",coreWound:"The gut center shared wound is around autonomy and resistance. All three types carry anger -- but each handles it differently. Eights express it outwardly and immediately. Nines deny and suppress it. Ones internalize it as resentment and self-criticism. All three are trying to answer: am I allowed to be here?",integration:"The path for gut types is learning to act from genuine presence rather than reactivity. For Eights, this means allowing vulnerability. For Nines, it means claiming their own agenda. For Ones, it means accepting imperfection.",rohr:"Rohr writes that the gut center is the seat of instinct. The wound of the gut types is that this instinct has been hijacked by the need to control, resist, or disappear.",stabile:"Stabile notes that all three gut types struggle with the physical reality of their own existence -- their bodies, their boundaries, and their right to be present in the world.",riso:"Riso and Hudson describe the gut center as the center of instinctual intelligence. When healthy, this produces decisive, grounded, embodied people. When distorted, it produces people who either dominate their environment, merge into it, or endlessly try to correct it.",typeNotes:{8:"Eights express gut anger outwardly -- directly, immediately, and physically. Their anger is a statement of selfhood: I exist, and you will not override me.",9:"Nines go to sleep to their anger -- numbing out, merging, forgetting their own agenda. Their anger is buried under accommodation, but it surfaces as immovable passive resistance.",1:"Ones turn anger inward, converting it into a relentless inner critic. Their resentment leaks out as irritability and judgment."}},
  heart:{label:"Heart / Feeling Center",types:[2,3,4],color:"#b47a9a",bg:"#5a3a6b",coreEmotion:"Shame",timeOrientation:"Past",coreWound:"The heart center shared wound is shame -- a deep sense that the authentic self is not enough. All three types have constructed a false self to compensate: Twos become what others need, Threes become what succeeds, Fours become what is uniquely themselves. All three are trying to answer: am I worthy of love?",integration:"The path for heart types is learning that the true self -- unperformed, unearned -- is already worthy of love. For Twos, this means receiving. For Threes, it means being rather than doing. For Fours, it means accepting the ordinary as sacred.",rohr:"Rohr writes that the heart center's deepest trap is the belief that love must be earned. All three types are performing for an audience, hoping that if they do it well enough, they will finally be loved.",stabile:"Stabile describes heart types as people who have lost contact with their own feelings in the act of managing how they appear.",riso:"Riso and Hudson describe the heart center as the seat of identity and value. When distorted, heart types become mirrors -- reflecting back what they believe will earn them love.",typeNotes:{2:"Twos carry shame about their own needs. Their pride is a compensation: I do not need anything, because I am needed.",3:"Threes carry shame about their authentic self. Their image is a compensation -- a curated self that cannot be rejected because it has never truly been revealed.",4:"Fours carry shame about being ordinary. Their uniqueness is a compensation: if I cannot be loveable, at least I can be unforgettable."}},
  head:{label:"Head / Thinking Center",types:[5,6,7],color:"#6a9aba",bg:"#2a4a6b",coreEmotion:"Fear",timeOrientation:"Future",coreWound:"The head center shared wound is anxiety -- a pervasive sense that the world is unsafe and that thinking hard enough will eventually solve it. Fives hoard knowledge. Sixes scan for threats. Sevens generate options and keep moving. All three are trying to answer: will I be okay?",integration:"The path for head types is learning to rest in the present moment. For Fives, this means risking participation. For Sixes, it means trusting their own inner authority. For Sevens, it means allowing stillness and grief.",rohr:"Rohr writes that the head center's deepest trap is confusing knowledge with wisdom, and planning with safety. The contemplative path asks them to trade the illusion of control for the reality of presence.",stabile:"Stabile describes head types as people who live in the gap between now and what might happen next. All three are trying to make the future safe before they agree to inhabit the present.",riso:"Riso and Hudson describe the head center as the seat of strategic intelligence. When distorted, it produces minds that cannot stop running -- spinning scenarios, preparing for disaster, or planning escapes.",typeNotes:{5:"Fives manage fear through withdrawal and knowledge. Their anxiety is about depletion -- if I give too much, there will be nothing left of me.",6:"Sixes manage fear through vigilance and loyalty. Their anxiety is about abandonment -- when this falls apart, will anyone be there?",7:"Sevens manage fear through motion and reframing. Their anxiety is about deprivation -- if I slow down, I will discover that I am not enough."}}
};

const wingData = {
  1:{w9:{name:"The Idealist",desc:"The Nine wing softens the One's characteristic intensity. The 1w9 tends to be more detached, contemplative, and self-contained. The Nine influence pulls toward withdrawal, idealism, and a quieter kind of certainty -- they are less likely to confront directly and more likely to simply disengage from what does not meet their standard.",voice:"Stabile notes that 1w9s are often mistaken for Fives -- they have a quality of principled withdrawal that reads as intellectual detachment. But beneath the stillness is the same One engine: the world is not right, and I am responsible for that gap."},w2:{name:"The Advocate",desc:"The Two wing warms the One considerably. The 1w2 moves toward people -- they want to help, teach, and improve things in direct contact with others. Their reforming impulse is interpersonal rather than philosophical. The Two wing adds genuine warmth and a desire to be appreciated.",voice:"Stabile says the 1w2 is the most likely One to be found in ministry, teaching, or social justice work. The shadow is that the Two wing introduces a need to be seen as good that the One might not want to admit."}},
  2:{w1:{name:"The Servant",desc:"The One wing gives the Two a principled, structured quality. The 2w1 is more serious, more idealistic, and more likely to frame their helping in terms of duty or calling rather than personal warmth. The One wing adds a self-critical dimension: they hold themselves to high standards and feel genuine guilt when they fall short.",voice:"Stabile notes that 2w1s are the most likely Twos to burn out quietly -- they give and give from a sense of obligation, and unlike the 2w3, they are less able to charm themselves back into feeling good about it."},w3:{name:"The Host",desc:"The Three wing makes this Two the most socially fluent and outwardly successful of the Two subtypes. They are charming, image-aware, and skilled at reading rooms and winning people over. Their giving is often expressed through hospitality and creating environments where people feel welcome.",voice:"Stabile says the 2w3 is the most likely Two to be unaware of their own neediness -- the Three wing keeps them moving and achieving, providing a constant alternative to sitting still long enough to feel what they actually need."}},
  3:{w2:{name:"The Charmer",desc:"The Two wing makes this Three the most interpersonally magnetic and relationally invested of the Three subtypes. They are warm, attentive, and genuinely skilled at making people feel seen -- but the Three core means there is always an audience being managed.",voice:"Stabile says the 3w2 will remember your birthday, ask about your mother, and make you feel like the only person in the room. The Two wing is real. But it is in service of the Three's image, whether they know it or not."},w4:{name:"The Professional",desc:"The Four wing gives this Three a seriousness, depth, and aesthetic sensitivity that the 3w2 often lacks. They want to be seen as not just successful but interesting, complex, and authentic. They are more introspective than the typical Three.",voice:"Stabile says the 3w4 is the most likely Three to have an existential crisis -- the Four wing keeps asking who they actually are beneath all the achievement."}},
  4:{w3:{name:"The Aristocrat",desc:"The Three wing gives this Four a social confidence, ambition, and concern with presentation that the 4w5 largely lacks. The 4w3 is oriented outward -- they want their uniqueness to be recognized and celebrated. They are more likely to be found in public creative roles.",voice:"Cron describes 4w3s as the type most likely to become successful artists who are never sure their success means they are actually good -- the Three wing delivers the recognition, and the Four wing immediately doubts whether it was deserved."},w5:{name:"The Bohemian",desc:"The Five wing intensifies the Four's interior life and adds an intellectual, analytical dimension to their emotional depth. The 4w5 is oriented toward understanding and solitude. They can seem even more inaccessible than the typical Four.",voice:"Stabile notes that 4w5s are the most likely type to be genuinely invisible -- the Four already feels unseen, and the Five wing actively chooses invisibility."}},
  5:{w4:{name:"The Iconoclast",desc:"The Four wing gives this Five an emotional intensity, aesthetic sensibility, and preoccupation with identity. The 5w4 is more focused on the interior -- on creative and artistic expression and finding their unique perspective. The Four wing adds a longing quality to the Five's intellectual life.",voice:"Cron says the 5w4 is the type most likely to produce work that is genuinely ahead of its time -- and the most likely to be misunderstood in their own lifetime."},w6:{name:"The Problem Solver",desc:"The Six wing gives this Five a more practical, collaborative, and security-conscious orientation. The 5w6 is more interested in systems, institutions, and how things work in the external world. The Six wing adds loyalty and reliability.",voice:"Stabile notes that 5w6s are the most likely to be genuinely useful in institutional settings -- they bring the Five's depth and the Six's reliability."}},
  6:{w5:{name:"The Defender",desc:"The Five wing gives this Six a more cerebral, self-contained, and intellectually rigorous quality. The 6w5 manages anxiety through preparation, analysis, and the accumulation of knowledge. They are more withdrawn and more independent-minded.",voice:"Stabile says the 6w5 is the most likely Six to be mistaken for a Five -- they have a quality of intellectual self-sufficiency that conceals the Six's relational anxiety underneath."},w7:{name:"The Buddy",desc:"The Seven wing gives this Six a warmth, humor, and social ease that makes them among the most likeable people on the Enneagram. The 6w7 moves toward people -- they manage anxiety through connection, laughter, and the reassurance of being liked.",voice:"Stabile says the 6w7 is the most fun Six and the most social -- but do not mistake the humor for the whole person. When the 6w7 decides you are trustworthy, the loyalty that follows is among the deepest on the Enneagram."}},
  7:{w6:{name:"The Entertainer",desc:"The Six wing gives this Seven a more relational, responsible, and anxiety-aware quality. The 7w6 is more oriented toward people and connection -- they want to have fun but want to have it with others, and they care more about being liked and included.",voice:"Cron says the 7w6 is the most likely Seven to have a genuine community around them. But when the anxiety breaks through the optimism, the 7w6 can be caught off guard by how scared they actually are."},w8:{name:"The Realist",desc:"The Eight wing gives this Seven a boldness, self-confidence, and willingness to confront that the 7w6 largely lacks. The 7w8 manages anxiety through force of will. They are more competitive, more direct, and more willing to take up space.",voice:"Stabile says the 7w8 is the most likely Seven to actually finish what they start -- the Eight wing brings a follow-through and a refusal to be defeated that the pure Seven rarely sustains."}},
  8:{w7:{name:"The Maverick",desc:"The Seven wing gives this Eight an energy, playfulness, and expansiveness that the 8w9 often lacks. The 8w7 is more extroverted, adventurous, and driven toward new experiences and conquest. They are among the most charismatic and socially dominant people on the Enneagram.",voice:"Cron says the 8w7 is the most fun Eight and the most dangerous -- their energy is genuinely intoxicating, and their capacity for excess is genuinely alarming."},w9:{name:"The Bear",desc:"The Nine wing softens the Eight's characteristic forcefulness and gives them a quality of steadiness, patience, and approachability. The 8w9 is more contained and deliberate -- they hold their power in reserve rather than putting it immediately on display.",voice:"Stabile calls the 8w9 the bear of the Enneagram -- warm and almost cuddly until provoked, and then genuinely terrifying. The Nine wing makes this Eight more likely to let you get close."}},
  9:{w8:{name:"The Referee",desc:"The Eight wing gives this Nine an assertiveness, directness, and willingness to take up space that the 9w1 often lacks. The 9w8 has access to a raw energy and force that can surprise people who expect all Nines to be uniformly passive.",voice:"Stabile says the 9w8 is the most likely Nine to surprise you -- you think you are dealing with someone who will go along with everything, and then suddenly there is a line, and they will not cross it."},w1:{name:"The Dreamer",desc:"The One wing gives this Nine a quiet idealism, a sense of principle, and a mild but genuine perfectionism. The 9w1 is more oriented toward values and correctness. The One wing adds a critical faculty that operates mostly in the background.",voice:"Cron describes the 9w1 as the type most likely to have profound inner convictions that the people around them never fully know about. The One wing says things should be better. The Nine wing says someone else will probably handle it."}}
};

const SD = {
  instincts:{
    sp:{label:"Self-Preservation",short:"SP",color:"#b8956a",desc:"The self-preservation instinct governs drives around physical survival, comfort, security, and resource management. SP-dominant people are focused on having enough -- enough money, food, safety, warmth, and stability.",blind:"SP-blind people often neglect their own physical needs, comfort, and practical security."},
    so:{label:"Social",short:"SO",color:"#9a9aca",desc:"The social instinct governs belonging, status, recognition, and participation in groups and community. SO-dominant people are attuned to hierarchies, alliances, and their place within the collective.",blind:"SO-blind people often feel disconnected from group dynamics, uninterested in status, and sometimes genuinely puzzled by social politics."},
    sx:{label:"Sexual / One-to-One",short:"SX",color:"#aa6a6a",desc:"The sexual or one-to-one instinct governs intense connection, attraction, and the drive toward merger and stimulation. SX-dominant people seek experiences and relationships of depth and charge.",blind:"SX-blind people often find intense one-on-one energy draining or uncomfortable."}
  },
  counterTypes:{1:"sx",2:"sp",3:"sp",4:"sp",5:"so",6:"sp",7:"so",8:"sp",9:"so"},
  subs:{
    1:{sp:{name:"Worry / Anxiety",desc:"The self-preservation One is the most anxious of the three One subtypes and the least obviously critical of others. Their perfectionism turns inward: they worry constantly about whether they are doing things correctly. This subtype is the most likely to be misidentified as a Six."},so:{name:"Non-Adaptability / Rigidity",desc:"The social One is the most classically One-ish of the three subtypes -- the teacher, the reformer, the person who holds the standard for everyone. They are deeply invested in being seen as good, right, and correct. The inner critic has been externalized into a social role."},sx:{name:"Zeal / Intensity",desc:"The sexual One is the most intense and paradoxically the most counter-type of the One subtypes. The sx One channels reforming energy into intense one-on-one relationships and causes. They bring a missionary zeal to their commitments and their anger is closer to the surface."}},
    2:{sp:{name:"Me First / Privilege",desc:"The self-preservation Two is the most counter-type of the Two subtypes and the hardest to recognize as a Two. Rather than the overtly warm, giving presentation, the sp Two tends toward a childlike quality: they expect to be taken care of and charm warmly to get their needs met."},so:{name:"Ambition / Social Power",desc:"The social Two is the most achievement-oriented of the Two subtypes and can look considerably like a Three. Their giving and helping is directed toward groups and institutions. They want to be important and needed by the collective."},sx:{name:"Seduction / Conquest",desc:"The sexual Two is the most classically Two-like of the three subtypes -- overtly warm, attractive, and oriented toward winning the love of specific individuals. They focus their considerable emotional intelligence on making that person feel uniquely seen and valued."}},
    3:{sp:{name:"Security / Autonomy",desc:"The self-preservation Three is the most counter-type of the Three subtypes and among the hardest types on the entire Enneagram to recognize. They want to be seen as good at what they do without appearing to want to be seen at all."},so:{name:"Prestige / Status",desc:"The social Three is the most classically Three-like of the subtypes -- image-conscious, success-oriented, and acutely aware of their standing in any group."},sx:{name:"Charisma / Masculine-Feminine",desc:"The sexual Three directs their image-making energy into personal magnetism -- into being the most attractive, compelling, or desirable version of themselves in their one-on-one relationships."}},
    4:{sp:{name:"Dauntless / Reckless Courage",desc:"The self-preservation Four is the most counter-type of the Four subtypes. Where most Fours are visibly melancholic and emotionally expressive, the sp Four tends to be stoic, long-suffering, and quietly enduring. They do not show their suffering; they bear it."},so:{name:"Shame / Envy",desc:"The social Four is the most classically Four-like of the subtypes -- sensitive, self-conscious, and acutely aware of how they compare to others."},sx:{name:"Competition / Hate",desc:"The sexual Four is the most intense and externally focused of the Four subtypes -- their emotional energy goes outward in the form of competition, demand, and a fierce hunger for depth in their relationships."}},
    5:{sp:{name:"Castle / Fortress",desc:"The self-preservation Five is the most withdrawn and resource-protective of the Five subtypes. They are intensely focused on having their own space -- physical, temporal, emotional -- and they guard it with a thoroughness that can seem extreme to others."},so:{name:"Totem / Totemic Thinking",desc:"The social Five is the most counter-type of the Five subtypes -- they are oriented toward belonging in groups, but through shared values, ideals, or intellectual frameworks rather than through warm personal connection."},sx:{name:"Confidence / Warmth",desc:"The sexual Five is the most relational and emotionally available of the Five subtypes. They direct their one-to-one energy into finding a few deeply trusted connections with whom they can share their interior world."}},
    6:{sp:{name:"Warmth / Affection",desc:"The self-preservation Six is the most counter-type of the Six subtypes -- they manage fear through warmth and alliance-building rather than vigilance or testing."},so:{name:"Duty / Diligence",desc:"The social Six is the most classically Six-like of the subtypes -- responsible, rule-following, and authority-conscious. They manage fear through adherence to systems, institutions, and social norms."},sx:{name:"Strength / Beauty",desc:"The sexual Six is the most counter-type of the Six subtypes and often the hardest to recognize as a Six. They manage fear by becoming strong -- by embodying the very quality that would protect them from danger."}},
    7:{sp:{name:"Keepers of the Castle / Network",desc:"The self-preservation Seven is the most counter-type of the Seven subtypes -- they focus their appetite on securing a warm, abundant, comfortable life rather than on adventures."},so:{name:"Sacrifice / Countergluttony",desc:"The social Seven is the most counter-type of the Seven subtypes. They manage their Seven drive by subordinating their own desires to a cause or a group."},sx:{name:"Suggestibility / Fascination",desc:"The sexual Seven is the most visibly enthusiastic and idealistic of the Seven subtypes. They direct their appetite toward the most charged and exciting experiences and relationships available."}},
    8:{sp:{name:"Satisfactory Survival / Useful",desc:"The self-preservation Eight is the most counter-type of the Eight subtypes -- the least overtly aggressive and the most practically focused. Their power goes into securing resources and building a domain."},so:{name:"Solidarity / Complicity",desc:"The social Eight directs their power in service of a group, a cause, or the protection of vulnerable people."},sx:{name:"Possession / Surrender",desc:"The sexual Eight is the most classically Eight-like of the three subtypes -- intense, dominant, and deeply invested in their close relationships."}},
    9:{sp:{name:"Appetite / Collector",desc:"The self-preservation Nine manages the core disconnection by immersing themselves in physical comforts, routines, and pleasures."},so:{name:"Participation / Fun",desc:"The social Nine appears the most engaged and connected of the Nine subtypes -- present in groups, friendly, warm. But their participation is still a form of self-forgetting."},sx:{name:"Fusion / Union",desc:"The sexual Nine seeks complete merger with another person as a way of resolving the Nine's core longing for union and peace."}}
  }
};

const allRelationships = {
  "1-2":{title:"The Reformer and The Helper",gifts:"Ones bring structure, standards, and a commitment to doing things right. Twos bring warmth, attentiveness, and the ability to see what people need. Together they can create something genuinely good -- principled and caring at once.",friction:"Ones may experience Twos as indirect or boundary-less. Twos may feel they can never quite meet the One's standards. The One's inner critic can wound the Two deeply; the Two's emotional intensity can feel manipulative to the One.",growth:"The One learns to receive care without seeing it as a distraction. The Two learns to ask for what they need directly rather than giving in hopes of receiving.",rohr:"Rohr would say both types are trying to earn love -- the One through moral perfection, the Two through indispensability. The gift they offer each other is permission to be loved as they are.",stabile:"Stabile notes that this pairing often works beautifully in service contexts. The shadow is that neither is practiced at receiving."},
  "1-3":{title:"The Reformer and The Achiever",gifts:"Both are driven, competent, and hardworking. Ones bring ethical grounding and attention to quality; Threes bring efficiency, confidence, and the ability to get things done.",friction:"Ones care about doing things right; Threes care about being seen as successful. The One may feel the Three cuts corners or performs rather than actually caring.",growth:"The One learns to celebrate results and not just process. The Three learns that how something is done matters -- that integrity is not just inefficiency.",rohr:"Rohr notes that both types struggle to rest. The One because the world is not yet right; the Three because stopping means confronting who they are beneath the performance.",stabile:"Stabile says these two can build something extraordinary together if the One stops correcting and the Three stops performing."},
  "1-4":{title:"The Reformer and The Individualist",gifts:"An unlikely but rich pairing. The One brings discipline, grounding, and a commitment to acting on values. The Four brings emotional depth, creativity, and permission to feel what is actually there.",friction:"Ones can find Fours self-indulgent and dramatically emotional. Fours can find Ones rigid, emotionally unavailable, and critical in a way that wounds their already fragile sense of self.",growth:"The One learns that emotions are not inefficiencies -- they are data. The Four learns that discipline and structure are not the enemy of authenticity but its scaffold.",rohr:"Rohr writes that both types are carrying a wound about imperfection -- the One trying to fix it, the Four insisting it cannot be fixed.",stabile:"Stabile says this pairing tends to be more common in spiritual and creative communities where both types are drawn."},
  "1-5":{title:"The Reformer and The Investigator",gifts:"Both are precise, principled, and deeply committed to getting things right. They share a love of rigor, a high standard for quality, and a willingness to work hard and think carefully.",friction:"The One's inner critic can become external toward the Five, who responds by withdrawing. The Five's emotional detachment can frustrate the One, who interprets it as not caring enough.",growth:"The One learns that competence and goodness are not always the same thing. The Five learns that knowing something is not the same as being accountable to it.",rohr:"Rohr sees both types as living primarily in the mind -- one in a courtroom, the other in a library.",stabile:"Stabile notes that these two can work side by side in respectful parallel for a long time. The question is whether they ever actually reach each other."},
  "1-6":{title:"The Reformer and The Loyalist",gifts:"Both take responsibility seriously, care deeply about doing right by others, and share a fear of things going wrong. They can create an exceptionally reliable, trustworthy partnership.",friction:"The One's certainty can feel authoritarian to the Six, who needs to question, doubt, and test. The Six's perpetual anxiety can feel like a lack of faith to the One.",growth:"The One learns that doubt is not weakness -- it is wisdom. The Six learns to trust someone who has actually earned it.",rohr:"Rohr says both types are driven by a fear of wrongdoing -- the One fears being wrong, the Six fears being betrayed.",stabile:"Stabile says this pairing functions beautifully when trust is established -- and struggles when the Six's testing triggers the One's impatience."},
  "1-7":{title:"The Reformer and The Enthusiast",gifts:"Structure meets spontaneity. The One brings discipline, integrity, and follow-through; the Seven brings joy, creativity, and the ability to reframe anything positively.",friction:"The One finds the Seven irresponsible, scattered, and allergic to the hard parts of life. The Seven finds the One uptight, critical, and determined to turn everything into a task.",growth:"The One learns that joy is not a reward for finished work -- it is available now. The Seven learns that depth and commitment do not trap you; they free you.",rohr:"Rohr writes that Ones and Sevens are actually on the same security line -- they are what each other becomes in health.",stabile:"Stabile says these two can have tremendous fun together once the One stops correcting and the Seven stops running."},
  "1-8":{title:"The Reformer and The Challenger",gifts:"Both are gut types with a strong inner sense of justice and a low tolerance for hypocrisy. When aligned on a cause, this pairing is formidable -- principled, forceful, and willing to do the hard work.",friction:"Both think they are right. The Eight asserts it loudly; the One seethes and corrects. The Eight finds the One preachy and controlling. The One finds the Eight aggressive and unconcerned with rules.",growth:"The One learns that force of will and moral purity are not the same thing. The Eight learns that principles matter.",rohr:"Rohr sees both types as carrying a wound around goodness -- the One strives to be good; the Eight strives to be strong.",stabile:"Stabile says these two either become an unstoppable team or a war of attrition."},
  "1-9":{title:"The Reformer and The Peacemaker",gifts:"Ones bring direction, standards, and the drive to make things better. Nines bring acceptance, steadiness, and the ability to hold space without judgment.",friction:"The One may feel like they are carrying everything. The Nine may feel relentlessly pressured. The One's inner critic extends outward; the Nine's resistance is quiet but immovable.",growth:"The One learns that not everything needs to be corrected and that rest is not laziness. The Nine learns to show up with a position rather than dissolving into the One's agenda.",rohr:"Rohr writes that this is one of the most common pairings. The One needs the Nine's acceptance; the Nine needs the One's direction.",stabile:"Stabile says the Nine's stubbornness often surprises the One. They push and push, and the Nine absorbs it -- until one day the Nine simply stops moving."},
  "2-3":{title:"The Helper and The Achiever",gifts:"Both are warm, relationally sophisticated, and skilled at reading rooms. Together they can be magnetic -- the Two nurturing and present, the Three inspiring and effective.",friction:"Twos lead with love and Threes lead with achievement. The Two may feel used -- like emotional labor in service of the Three's goals.",growth:"The Two learns to receive recognition for who they are, not just what they give. The Three learns that authentic connection cannot be scheduled between accomplishments.",rohr:"Rohr writes that both types are performing for an audience. The Two hopes to be loved; the Three hopes to be admired.",stabile:"Stabile says: give both a task. The Two will ask who needs help. The Three will ask who is watching."},
  "2-4":{title:"The Helper and The Individualist",gifts:"Emotional richness defines this relationship. Both care about depth, authenticity, and genuine connection.",friction:"The Two can find the Four's self-absorption and emotional volatility exhausting. The Four can find the Two's giving manipulative -- a transaction dressed as love.",growth:"The Two learns that genuine love does not require giving everything. The Four learns that being cared for is not the same as being pitied.",rohr:"Rohr sees both types as heart center types carrying the wound of unworthiness.",stabile:"Stabile says this pairing can be extraordinarily deep or extraordinarily volatile -- sometimes both at once."},
  "2-5":{title:"The Helper and The Investigator",gifts:"The Two brings warmth, emotional attunement, and genuine care. The Five brings clarity, depth, and a kind of rare honest attention.",friction:"Twos move toward; Fives pull back. The Two experiences the Five's withdrawal as rejection. The Five experiences the Two's warmth as an invasion of their carefully maintained inner space.",growth:"The Two learns that not everyone needs to be pursued. The Five learns that allowing someone in does not mean being consumed.",rohr:"Rohr would say both types have lost access to their own needs in different ways -- the Two by giving them away, the Five by hoarding them.",stabile:"Stabile says this pairing requires unusual patience from the Two and unusual courage from the Five."},
  "2-6":{title:"The Helper and The Loyalist",gifts:"Both are deeply loyal, relationship-focused, and oriented toward the safety and wellbeing of the people they love.",friction:"Both can be anxious in different registers -- the Two anxious about being needed, the Six anxious about being safe.",growth:"The Two learns that the Six's questioning is not a sign of unlove. The Six learns that the Two's warmth is also genuinely real.",rohr:"Rohr writes that both types are searching for the same thing: a love that is secure enough to stop performing for.",stabile:"Stabile says this pairing often produces remarkably stable, caring relationships."},
  "2-7":{title:"The Helper and The Enthusiast",gifts:"Fun, warm, and often magnetic together. The Two brings emotional attunement; the Seven brings joy, expansiveness, and the ability to make life feel like an adventure.",friction:"The Seven consumes energy and experience without always reciprocating. The Two may feel drained and unappreciated.",growth:"The Two learns that care does not require sacrifice. The Seven learns that depth is not a burden.",rohr:"Rohr writes that both types avoid pain through different strategies -- the Two through giving, the Seven through motion.",stabile:"Stabile says Twos and Sevens often spark well early. The question is whether the Seven slows down enough for the Two to feel genuinely seen."},
  "2-8":{title:"The Helper and The Challenger",gifts:"Stabile calls this one of the most common pairings on the Enneagram -- and one of the most electric. Eights protect fiercely; Twos nurture generously.",friction:"The Eight's bluntness can wound the Two's need to be appreciated; the Two's indirect influence can feel manipulative to the Eight.",growth:"The Eight learns to let someone in without interpreting care as an attempt at control. The Two learns to ask for what they need directly.",rohr:"Rohr sees both types as deeply wounded around love -- the Eight armored against vulnerability, the Two performing for it.",stabile:"Stabile says this pairing has the highest ceiling and the lowest floor of any on the Enneagram."},
  "2-9":{title:"The Helper and The Peacemaker",gifts:"Warm, accommodating, deeply committed to others. Together they can create an environment of extraordinary generosity and ease.",friction:"Neither likes to ask for what they need. Both can quietly build resentment while maintaining a peaceful surface.",growth:"The Two learns to ask directly. The Nine learns that their own needs are not an imposition.",rohr:"Rohr sees both types as having forgotten themselves -- the Two in the act of loving, the Nine in the act of merging.",stabile:"Stabile says: two people who never ask for what they need will eventually find they have nothing left to give."},
  "3-4":{title:"The Achiever and The Individualist",gifts:"Both are heart types wrestling with identity and longing to be seen. The Three brings confidence, competence, and the ability to act. The Four brings emotional honesty and depth.",friction:"Threes construct an identity that works; Fours reject any identity that feels inauthentic.",growth:"The Three learns that being genuinely seen -- with flaws and all -- is more satisfying than being admired. The Four learns that doing is also a form of authenticity.",rohr:"Rohr notes both types are trying to answer: am I loved?",stabile:"Stabile says: Threes can cry on cue. Fours cannot stop crying once they start."},
  "3-5":{title:"The Achiever and The Investigator",gifts:"Both are competent, self-contained, and privately oriented. They share a respect for capability and a discomfort with excessive emotional display.",friction:"The Three is externally oriented. The Five is internally oriented. Over time, the Three may feel the Five is withholding; the Five may feel the Three is performing.",growth:"The Three learns that depth and expertise are more lasting than image. The Five learns that being seen is worth the risk.",rohr:"Rohr writes that both types have lost contact with their feelings through different mechanisms.",stabile:"Stabile says these two often do excellent work together while remaining somewhat strangers to each other's inner lives."},
  "3-6":{title:"The Achiever and The Loyalist",gifts:"The Three brings confidence, vision, and the ability to inspire. The Six brings loyalty, thoroughness, and the ability to anticipate what could go wrong.",friction:"The Six asks are we safe while the Three asks are we winning.",growth:"The Three learns that the Six's questions are not obstacles -- they are due diligence. The Six learns that the Three's optimism can be genuinely clarifying.",rohr:"Rohr notes these are on each other's security and stress lines.",stabile:"Stabile says: when this pairing trusts each other, they are formidable."},
  "3-7":{title:"The Achiever and The Enthusiast",gifts:"High energy, high output, and genuinely fun together. Both are forward-moving, optimistic, and skilled at inspiring others.",friction:"Both avoid pain. Together they can construct an impressive life that never goes deep enough.",growth:"The Three learns that the best moments are not achievements. The Seven learns that finishing something is its own kind of freedom.",rohr:"Rohr describes Threes as running toward something and Sevens as running away from something.",stabile:"Stabile says: Threes finish things. Sevens start things."},
  "3-8":{title:"The Achiever and The Challenger",gifts:"Two powerful, driven personalities. Together they can accomplish remarkable things.",friction:"The Eight's directness can feel threatening to the Three's image. The Three's image-consciousness can feel dishonest to the Eight.",growth:"The Three learns that real respect requires authenticity, not performance. The Eight learns that strategy and image are tools, not weaknesses.",rohr:"Rohr notes: take away the audience, and the Three slows down. The Eight does not.",stabile:"Stabile says: Eights do not care if you like them. Threes need you to admire them."},
  "3-9":{title:"The Achiever and The Peacemaker",gifts:"Threes bring ambition, energy, and direction. Nines bring acceptance, stability, and warmth.",friction:"The Nine may lose themselves in the Three's agenda. The Three may not notice.",growth:"The Three learns to stop and ask what the Nine actually wants. The Nine learns to say it before they resent not having been asked.",rohr:"Rohr writes that both types have lost touch with their authentic self.",stabile:"Stabile says: Nines are in danger of disappearing in this pairing."},
  "4-5":{title:"The Individualist and The Investigator",gifts:"Both are introspective, unconventional, and wary of the ordinary. Both value depth, honesty, and genuine understanding.",friction:"Fours are emotionally flooded; Fives observe emotions from a distance.",growth:"The Four learns that emotional distance is not always indifference. The Five learns that staying present through emotional intensity does not deplete them as much as they feared.",rohr:"Rohr describes Fours as living in the wound and Fives as living behind the glass.",stabile:"Stabile says: ask them about their feelings. The Four gives you twenty minutes. The Five gives you two sentences."},
  "4-6":{title:"The Individualist and The Loyalist",gifts:"Both are anxious in different registers, both deeply loyal, and both capable of extraordinary emotional presence when trust is established.",friction:"The Four's push-pull dynamic can activate the Six's worst fears. The Six's need for reassurance can feel smothering to the Four.",growth:"The Four learns that the Six's loyalty is not a cage -- it is a foundation. The Six learns that the Four's withdrawal is not rejection.",rohr:"Rohr writes that both types live in a world where danger feels close.",stabile:"Stabile says this pairing, when it works, produces extraordinary mutual loyalty and emotional depth."},
  "4-7":{title:"The Individualist and The Enthusiast",gifts:"Fours go deep; Sevens go wide. The Four brings emotional honesty. The Seven brings joy and the ability to find the light even in darkness.",friction:"The Seven's reframing of pain can feel dismissive to the Four. The Four's insistence on dwelling in difficulty can feel like an indulgence to the Seven.",growth:"The Four learns that joy is not a betrayal of depth. The Seven learns that sitting with pain is what makes the joy worth having.",rohr:"Rohr writes that Fours and Sevens are on the same stress and security lines.",stabile:"Stabile says this pairing has real growth potential because each one has what the other is running from."},
  "4-8":{title:"The Individualist and The Challenger",gifts:"Intensity is the shared language. Both feel everything strongly, both are drawn to authenticity and depth.",friction:"The Four's emotional volatility can trigger the Eight's protective instincts -- which come out as control rather than care.",growth:"The Four learns that strength and vulnerability are not opposites. The Eight learns that emotional expression is the doorway to the tenderness they buried.",rohr:"Rohr writes that both types carry an enormous amount of pain beneath their characteristic presentation.",stabile:"Stabile says this pairing can be one of the most alive and one of the most devastating."},
  "4-9":{title:"The Individualist and The Peacemaker",gifts:"Both are drawn to depth, quiet, and the interior life. The Four brings emotional richness; the Nine brings acceptance.",friction:"The Four's emotional intensity can overwhelm the Nine. The Nine's muted affect can frustrate the Four.",growth:"The Four learns that ordinary steadiness is not evidence of shallowness. The Nine learns that claiming their own emotional life is presence, not selfishness.",rohr:"Rohr would describe this as a pairing of two types who have each gone to sleep in their own way.",stabile:"Stabile says this pairing often looks peaceful from the outside and feels unresolved from the inside."},
  "5-6":{title:"The Investigator and The Loyalist",gifts:"Both are head-center types who manage fear through thinking. Both value depth, thoroughness, and loyalty.",friction:"The Five trusts their own analysis and can become isolated in it. The Six trusts others and doubts themselves.",growth:"The Five learns that sharing their knowledge is not depletion -- it is connection. The Six learns that their own instincts are more trustworthy than they believe.",rohr:"Rohr sees both types as caught in the head center's trap: mistaking thinking for living.",stabile:"Stabile says Fives trust themselves too much and others too little. Sixes trust others too much and themselves too little."},
  "5-7":{title:"The Investigator and The Enthusiast",gifts:"Sevens can pull Fives into the world; Fives can offer Sevens the depth they tend to avoid.",friction:"The Seven's scattershot enthusiasm can exhaust the Five. The Five's withdrawal can frustrate the Seven.",growth:"The Five learns that not every engagement is a depletion. The Seven learns that going deep in one thing is more satisfying than going wide.",rohr:"Rohr writes that both types are avoiding the present -- the Five by retreating into the mind, the Seven by racing toward the future.",stabile:"Stabile says this pairing works best when the Five has enough energy and the Seven has enough patience."},
  "5-8":{title:"The Investigator and The Challenger",gifts:"Both are self-contained, strong-willed, and deeply private. Both respect competence and directness.",friction:"Neither asks for help. Neither admits weakness. The relationship can go years without either person feeling truly known.",growth:"The Five learns to let the Eight draw them out. The Eight learns that the Five's withdrawal is not rejection but self-protection.",rohr:"Rohr would say both types are living at the edge of their own interiority.",stabile:"Stabile observes that this is one of the most quietly powerful pairings -- and one of the most functionally isolated."},
  "5-9":{title:"The Investigator and The Peacemaker",gifts:"Both love quiet, both avoid intrusion, and both can be genuinely comfortable in long stretches of peaceful companionship.",friction:"Both can withdraw -- the Five into the mind, the Nine into comfortable numbness. Together they can build a relationship where nothing difficult ever gets addressed.",growth:"The Five learns that the Nine's presence, though quiet, is real and valuable. The Nine learns that the Five's inner world is worth pursuing.",rohr:"Rohr writes that both types have withdrawn from full presence.",stabile:"Stabile says this pairing can be one of the most genuinely peaceful on the Enneagram -- and one of the easiest to mistake for intimacy when it is actually parallel solitude."},
  "6-7":{title:"The Loyalist and The Enthusiast",gifts:"Sevens help Sixes lighten their anxiety; Sixes help Sevens take responsibility and stay committed.",friction:"The Six's anxiety can feel like a wet blanket to the Seven's enthusiasm. The Seven's reframing of difficulty can feel like avoidance to the Six.",growth:"The Six learns that not every risk leads to catastrophe. The Seven learns that preparation and commitment are not limitations.",rohr:"Rohr notes these two are on the same line -- they move toward each other in health.",stabile:"Stabile says: Sevens and Sixes together often produce genuine fun with genuine safety."},
  "6-8":{title:"The Loyalist and The Challenger",gifts:"Sixes often look for a strong, trustworthy protector. Eights often want someone fiercely loyal to protect. When those needs are aligned, this pairing can be deeply stable.",friction:"The Eight's directness and force can activate the Six's anxiety and suspicion. The Six's testing and questioning can feel to the Eight like a loyalty problem.",growth:"The Six learns to trust someone who has actually earned it. The Eight learns that the Six's questioning is love, not doubt.",rohr:"Rohr writes that both types are deeply wounded around betrayal.",stabile:"Stabile says: when a Six finally trusts an Eight, the loyalty is absolute."},
  "6-9":{title:"The Loyalist and The Peacemaker",gifts:"Both are deeply committed, conflict-avoidant, and oriented toward safety and belonging.",friction:"Neither is comfortable with conflict. The Six's anxiety can be contagious; the Nine's passivity can amplify the Six's worry.",growth:"The Six learns to trust their own inner authority. The Nine learns that avoiding conflict is not the same as creating peace.",rohr:"Rohr writes that both types have lost access to their gut center's natural authority.",stabile:"Stabile says this pairing often works beautifully until it does not."},
  "7-8":{title:"The Enthusiast and The Challenger",gifts:"High energy, high impact, and genuinely exciting together. Both are assertive, both are allergic to boredom.",friction:"Both are allergic to limitation and neither backs down easily.",growth:"The Seven learns that conflict does not have to be avoided. The Eight learns that the Seven's enthusiasm is not avoidance but a genuine orientation toward life.",rohr:"Rohr writes that both types live at a high intensity.",stabile:"Stabile says: this pairing burns bright. The question is whether it burns long."},
  "7-9":{title:"The Enthusiast and The Peacemaker",gifts:"Both prefer harmony and resist difficulty, and both can be genuinely warm, fun, and easy to be around.",friction:"Neither wants to deal with the hard thing. The Seven avoids pain through motion; the Nine avoids it through inertia.",growth:"The Seven learns that staying put is where the depth is. The Nine learns that choosing something is an act of love.",rohr:"Rohr notes that both struggle with full presence.",stabile:"Stabile says: Sevens have opinions and share them freely. Nines have opinions and keep them to themselves."},
  "8-9":{title:"The Challenger and The Peacemaker",gifts:"Eights project enormous force; Nines absorb it. The Eight brings energy, direction, and an almost gravitational presence. The Nine brings steadiness, acceptance, and a quality of peace that the Eight deeply craves.",friction:"The Eight's force can inadvertently overwhelm the Nine, who disappears rather than pushes back. The Nine's passive resistance can be maddening to the Eight.",growth:"The Eight learns that the Nine's quiet is not weakness. The Nine learns that asserting themselves does not destroy the relationship.",rohr:"Rohr writes that Eights and Nines are both gut center types who have lost access to their instinctual wisdom.",stabile:"Stabile says the Nine's stubbornness is the Eight's greatest teacher."}
};

const mistypings = {
  "1-2":{title:"Type 1 vs. Type 2",summary:"Both are driven by a deep sense of responsibility -- but Ones feel responsible for what is right, while Twos feel responsible for who is loved.",distinctions:[{label:"Core motivation",one:"To be good, correct, and ethical.",two:"To be needed and loved."},{label:"Anger",one:"Ones feel resentment when others do not meet their standards. It leaks out as irritability.",two:"Twos feel anger when their giving is not reciprocated. It erupts when they hit a wall."},{label:"Self-image",one:"Ones are self-critical. The inner critic runs constantly.",two:"Twos generally see themselves as loving and good."},{label:"Relationships",one:"Ones maintain distance and can seem emotionally cool.",two:"Twos move toward people. Closeness is the goal."},{label:"Key question",one:"Did I do this correctly?",two:"Does this person know I care about them?"}],rohr:"Rohr notes that both types struggle with the illusion that love must be earned -- but Ones earn it through moral perfection, while Twos earn it through indispensability.",stabile:"Stabile says the tell is simple: when a One helps, they feel it is their duty. When a Two helps, they feel it is their identity."},
  "1-6":{title:"Type 1 vs. Type 6",summary:"Both are responsible, rule-conscious, and anxious about getting things wrong.",distinctions:[{label:"Source of anxiety",one:"Ones are anxious about being wrong or imperfect. The fear is internal and moral.",two:"Sixes are anxious about what could go wrong externally. The fear is relational and situational."},{label:"Rules",one:"Ones follow rules because they believe in them.",two:"Sixes follow rules because they provide safety -- but will question authority if they distrust it."},{label:"Doubt",one:"Ones are certain about what is right. Their problem is rigidity, not indecision.",two:"Sixes are perpetually uncertain. Doubt is their constant companion."},{label:"Loyalty",one:"Ones are loyal to principles more than to people.",two:"Sixes are fiercely loyal to people, groups, and chosen authorities."},{label:"Key question",one:"Is this the right thing to do?",two:"Can I trust this? Will it be okay?"}],rohr:"Rohr observes that the One's burden is perfectionism, while the Six's is vigilance.",stabile:"Stabile: Ones know what they think. Sixes are not sure -- they are still checking, still running the scenarios."},
  "1-8":{title:"Type 1 vs. Type 8",summary:"Both are gut-center types with strong convictions and a low tolerance for injustice.",distinctions:[{label:"Anger",one:"Ones suppress anger. It comes out as controlled criticism or resentment.",two:"Eights express anger immediately and physically. They confront rather than ruminate."},{label:"Control",one:"Ones want to control themselves and their environment.",two:"Eights want control to protect their autonomy."},{label:"Vulnerability",one:"Ones acknowledge weakness reluctantly.",two:"Eights rarely admit vulnerability. Weakness feels dangerous."},{label:"Rules",one:"Ones are rule-followers. Rules represent moral order.",two:"Eights resist rules imposed from outside."},{label:"Key question",one:"Am I doing the right thing?",two:"Is anyone going to try to control me?"}],rohr:"Rohr sees both types as carrying a wound around goodness -- the One strives to be good; the Eight strives to be strong.",stabile:"Stabile: Ones are angry because the world is not right. Eights are angry because someone is trying to push them around."},
  "2-3":{title:"Type 2 vs. Type 3",summary:"Both are image-conscious heart-center types who care deeply about how they are perceived.",distinctions:[{label:"Core drive",one:"Twos want to be loved and needed. Success is a vehicle for connection.",two:"Threes want to be admired and successful. Connection is a vehicle for achievement."},{label:"Feelings",one:"Twos are emotionally expressive.",two:"Threes set feelings aside as inefficient."},{label:"Other-focus",one:"Twos genuinely orient toward others needs.",two:"Threes read others primarily to perform effectively."},{label:"Success",one:"Twos feel good when relationships are warm.",two:"Threes feel good when they have won or been recognized."},{label:"Key question",one:"Do they love me and need me?",two:"Am I winning? Do they respect me?"}],rohr:"Rohr describes the heart center's shared wound as the loss of identity.",stabile:"Stabile says: give both a task. The Two will ask who needs help. The Three will ask who is watching."},
  "2-8":{title:"Type 2 vs. Type 8",summary:"Both can be generous, protective, and fierce in their loyalty.",distinctions:[{label:"Power",one:"Eights are comfortable with power and take it up naturally.",two:"Twos are drawn to power in others -- they influence through relationship."},{label:"Giving",one:"Eights give on their own terms, without expectation of return.",two:"Twos give to be needed and appreciated."},{label:"Vulnerability",one:"Eights guard their soft underbelly fiercely.",two:"Twos are emotionally expressive and present."},{label:"Conflict",one:"Eights confront directly and immediately.",two:"Twos avoid conflict to protect the relationship."},{label:"Key question",one:"Who is in charge here?",two:"Do they need me? Do they love me?"}],rohr:"Rohr sees both types as carrying deep wounds about love.",stabile:"Stabile says: the Eight does not need thanks. The Two does."},
  "2-9":{title:"Type 2 vs. Type 9",summary:"Both are warm, accommodating, and conflict-avoidant. The mistyping is one of the most common.",distinctions:[{label:"Motivation",one:"Twos give in order to be loved and needed. There is an emotional charge to their generosity.",two:"Nines go along with others to keep the peace. Their accommodation is about inertia."},{label:"Emotion",one:"Twos are emotionally expressive. They feel things loudly.",two:"Nines are emotionally muted. They often do not know what they are feeling."},{label:"Presence",one:"Twos move toward people actively. They initiate.",two:"Nines recede. They wait and follow."},{label:"Anger",one:"Twos feel anger when they are not appreciated for their giving.",two:"Nines feel anger only dimly -- it surfaces as passive stubbornness."},{label:"Key question",one:"Do they know how much I have done for them?",two:"Is everyone okay? Is there peace?"}],rohr:"Rohr sees both types as having forgotten themselves -- Twos in the act of loving, Nines in the act of merging.",stabile:"Stabile's test: when there is conflict, does the person fight to preserve the connection (Two) -- or disappear into compliance to make it stop (Nine)?"},
  "3-4":{title:"Type 3 vs. Type 4",summary:"Both are image-aware heart types who care about being seen.",distinctions:[{label:"Identity",one:"Threes construct an identity that works. They shape themselves to the audience.",two:"Fours resist any identity that feels inauthentic."},{label:"Feelings",one:"Threes bypass feelings to stay productive.",two:"Fours are defined by their emotional life."},{label:"Success",one:"Threes want to succeed and be recognized for it.",two:"Fours distrust success that comes too easily."},{label:"Longing",one:"Threes long for admiration and validation.",two:"Fours long to be deeply known -- not admired, but truly seen."},{label:"Key question",one:"Am I impressive?",two:"Am I real? Am I seen?"}],rohr:"Rohr notes both types are trying to answer: am I loved?",stabile:"Stabile says: Threes can cry on cue. Fours cannot stop crying once they start."},
  "3-7":{title:"Type 3 vs. Type 7",summary:"Both are energetic, optimistic, and driven.",distinctions:[{label:"Drive",one:"Threes are driven by achievement and the need to be seen as successful.",two:"Sevens are driven by experience and the need to avoid pain and boredom."},{label:"Focus",one:"Threes can sustain focus on a goal. They finish things.",two:"Sevens scatter across possibilities and struggle to finish."},{label:"Image",one:"Threes monitor how they are perceived constantly.",two:"Sevens care less about image and more about freedom."},{label:"Pain",one:"Threes bypass pain by staying busy and productive.",two:"Sevens bypass pain by reframing it or moving on."},{label:"Key question",one:"Am I winning?",two:"What is next? How do I keep this from getting heavy?"}],rohr:"Rohr describes Threes as running toward something -- success. Sevens are running away from something -- pain.",stabile:"Stabile says: Threes finish things. Sevens start things."},
  "3-8":{title:"Type 3 vs. Type 8",summary:"Both are assertive, driven, and comfortable taking up space.",distinctions:[{label:"Image",one:"Eights are indifferent to image. They care about respect, not approval.",two:"Threes are acutely image-conscious."},{label:"Motivation",one:"Eights act from gut instinct and a need for autonomy.",two:"Threes act to achieve and be recognized."},{label:"Vulnerability",one:"Eights have deep tenderness beneath the armor.",two:"Threes bypass emotion entirely to maintain their performance."},{label:"Conflict",one:"Eights welcome conflict. It clarifies them.",two:"Threes avoid conflict that might damage their image."},{label:"Key question",one:"Does anyone think they can push me around?",two:"Am I the most impressive person in this room?"}],rohr:"Rohr notes: take away the audience, and the Three slows down. The Eight does not.",stabile:"Stabile says: Eights do not care if you like them. Threes need you to admire them."},
  "4-5":{title:"Type 4 vs. Type 5",summary:"Both are introverted, unconventional, and prone to withdrawal.",distinctions:[{label:"Withdrawal",one:"Fours withdraw when they feel misunderstood or emotionally overwhelmed.",two:"Fives withdraw to conserve energy and protect their inner world."},{label:"Emotion",one:"Fours are emotionally flooded. Feelings are the primary data of existence.",two:"Fives observe emotions from a distance."},{label:"Self-view",one:"Fours feel fundamentally different -- and missing something essential.",two:"Fives feel fundamentally separate -- observers of life rather than participants."},{label:"Creativity",one:"Fours express themselves creatively to process what is inside.",two:"Fives pursue knowledge and mastery."},{label:"Key question",one:"Why am I so different? What is missing in me?",two:"Do I have enough energy to engage safely?"}],rohr:"Rohr describes Fours as living in the wound and Fives as living behind the glass.",stabile:"Stabile says: ask them about their feelings. The Four gives you twenty minutes. The Five gives you two sentences."},
  "4-9":{title:"Type 4 vs. Type 9",summary:"Both can be introspective, quiet, and drawn to depth.",distinctions:[{label:"Emotion",one:"Fours are flooded with feeling. Their inner life is vivid and consuming.",two:"Nines have muted, diffuse emotions. They often cannot identify what they are feeling."},{label:"Identity",one:"Fours are intensely preoccupied with their uniqueness and wound.",two:"Nines have a weak sense of identity -- they merge with others."},{label:"Envy",one:"Fours long for what others seem to have naturally.",two:"Nines do not experience much envy. They accept what is."},{label:"Withdrawal",one:"Fours withdraw to protect their emotional space.",two:"Nines withdraw because engaging feels like too much effort."},{label:"Key question",one:"What is missing in me?",two:"Does it really matter? Can we just be at peace?"}],rohr:"Rohr describes the Four's pain as acute -- a sharp, named longing. The Nine's pain is chronic and unnamed.",stabile:"Stabile says: Fours know they are in pain. Nines often do not realize they are in pain at all -- they call it peace."},
  "5-6":{title:"Type 5 vs. Type 6",summary:"Both are head-center types who manage anxiety through thinking.",distinctions:[{label:"Fear",one:"Fives fear being overwhelmed or depleted. They protect their inner resources.",two:"Sixes fear being unsafe or abandoned. They scan for threats."},{label:"Relationships",one:"Fives keep relationships compartmentalized and prefer distance.",two:"Sixes invest deeply in relationships -- and worry about them constantly."},{label:"Authority",one:"Fives are indifferent to authority -- they trust themselves.",two:"Sixes have a complicated relationship with authority."},{label:"Doubt",one:"Fives trust their own analysis. Slow but confident.",two:"Sixes doubt their conclusions constantly."},{label:"Key question",one:"Do I have enough energy to handle this?",two:"Can I trust this? Can I trust myself?"}],rohr:"Rohr sees both types as caught in the head center's trap: mistaking thinking for living.",stabile:"Stabile says Fives trust themselves too much and others too little. Sixes trust others too much and themselves too little."},
  "6-9":{title:"Type 6 vs. Type 9",summary:"Both avoid conflict and seek stability. One is anxious beneath the surface; the other is numb.",distinctions:[{label:"Anxiety",one:"Sixes are visibly anxious -- they anticipate problems and rehearse worst-case scenarios.",two:"Nines experience anxiety as a dull hum they have learned to tune out."},{label:"Compliance",one:"Sixes comply to stay safe within trusted systems.",two:"Nines comply to avoid disruption -- it is the path of least resistance."},{label:"Loyalty",one:"Sixes are fiercely, consciously loyal.",two:"Nines are loyal by default -- they stay because leaving requires too much energy."},{label:"Decisions",one:"Sixes struggle to decide because they fear making the wrong choice.",two:"Nines struggle to decide because they do not feel their preference matters."},{label:"Key question",one:"Is this safe? Can I trust this?",two:"Does it really matter what I think?"}],rohr:"Rohr notes that both types have lost access to their gut center's natural authority.",stabile:"Stabile: Sixes know they are anxious. Nines do not."},
  "7-9":{title:"Type 7 vs. Type 9",summary:"Both appear easygoing and conflict-avoidant. Both prefer harmony over hardship.",distinctions:[{label:"Energy",one:"Sevens are high-energy, forward-moving, future-focused.",two:"Nines are low-energy, present-focused, inertia-prone."},{label:"Avoidance",one:"Sevens avoid pain through stimulation and constant motion.",two:"Nines avoid pain by merging with others and going along."},{label:"Positivity",one:"Sevens are genuinely enthusiastic -- they believe good things are coming.",two:"Nines are peaceful rather than positive. Settled, not excited."},{label:"Self-assertion",one:"Sevens assert themselves readily around their freedom.",two:"Nines rarely assert themselves. It feels selfish."},{label:"Key question",one:"What is the most exciting option?",two:"How do we keep everything calm?"}],rohr:"Rohr notes that both struggle with full presence.",stabile:"Stabile says: Sevens have opinions and share them freely. Nines have opinions and keep them to themselves."}
};

const getMistypingKey = (a,b) => {
  const pairs = [[1,2],[1,6],[1,8],[2,3],[2,8],[2,9],[3,4],[3,7],[3,8],[4,5],[4,9],[5,6],[6,9],[7,9]];
  const found = pairs.find(([x,y]) => (x===a&&y===b)||(x===b&&y===a));
  if (!found) return null;
  return found[0]+"-"+found[1];
};

const growthPractices = {
  1:["Notice when your inner critic speaks -- not to silence it, but to name it. This small act of observation creates space between you and the voice.","Practice letting something be good enough. Choose one task this week and stop before you are fully satisfied. Notice what happens.","When you feel resentment rising, ask: what do I actually need right now? The resentment is usually pointing at an unmet need."],
  2:["Ask yourself once a day: what do I want? Not what others need -- what do you actually want? Sit with the question even if the answer does not come easily.","Practice receiving. When someone offers you help or care, resist the urge to immediately redirect to them. Simply say thank you and let it land.","Notice when you are helping to be needed rather than because it is genuinely called for. The difference often lives in your body."],
  3:["Schedule time where productivity is not the point. A walk with no destination. Notice the discomfort and stay with it.","Tell someone something true about how you are doing that is not a performance of being fine. Practice being a little more known.","When you reach a goal, resist immediately moving to the next one. Stay in the accomplishment for a day. Ask: who am I right now, before the next thing starts?"],
  4:["When you notice yourself longing for what you do not have, try shifting attention to what is actually present -- not to suppress the longing, but to expand your field of attention.","Commit to something ordinary and do it with full presence. The ordinary, fully inhabited, is where life actually happens.","Notice when you are romanticizing your own suffering. Ask: is this feeling a doorway to something, or have I been living in the doorway for too long?"],
  5:["Practice showing up without being fully prepared. Let yourself engage with something before you have had time to research it completely. Notice that you survive.","Reach out to someone today -- not because you need something, but just to make contact. Practice initiating connection.","Notice when you are observing your own life rather than living it. Try staying in the experience rather than moving immediately to analysis."],
  6:["When anxiety spikes, ask: what do I actually know to be true right now, in this moment? Not what might happen -- what is actually here.","Notice when you are seeking reassurance. Before asking for it, sit with the uncertainty for five minutes. Ask: what does my own instinct say?","Identify one area where you consistently defer to others judgment over your own. Practice making a decision there without consulting anyone."],
  7:["Choose one thing this week and finish it -- even when the initial excitement has passed. Notice the satisfaction of completion that is unavailable any other way.","Practice sitting with a difficult feeling rather than reframing it. Name it. Let it be what it is for five minutes before looking for the silver lining.","When you are planning something exciting in the future, ask: am I anticipating because I am genuinely excited, or am I anticipating to escape something in the present?"],
  8:["Identify one person in your life who has been trying to reach you emotionally. Let them in a little further than is comfortable.","Notice when you are overriding others pace or preferences. Practice pausing and asking what they need rather than moving to what you think is best.","Let yourself be wrong about something in front of someone else -- not strategically, but genuinely. Notice what it costs and what it opens."],
  9:["Identify one thing you want this week -- not what would keep the peace, but what you want. Say it out loud to at least one person.","When someone asks for your opinion, give one. Practice having a position, even a tentative one.","Notice when you are merging into someone else's agenda. Ask: what did I think before I started agreeing? Try holding onto that thread a little longer."]
};

const scholars = [
  {id:"rohr",name:"Richard Rohr",color:"#b8956a",dates:"b. 1943",tradition:"Franciscan friar, Christian contemplative",tagline:"The Enneagram as a map of the false self",overview:"Rohr encountered the Enneagram in the early 1970s through the oral transmission circulating in Catholic formation circles. He brought to it a Franciscan sensibility rooted in mysticism, Scripture, and the centrality of transformation over information. For Rohr, the Enneagram is first and foremost a spiritual tool -- a way of diagnosing the ego's defensive strategies so that the true self, the imago Dei, can emerge.",distinctives:"Rohr places the Enneagram explicitly within the Christian mystical tradition. He connects the nine types to the seven deadly sins, to Ignatian discernment, and to the contemplative path of kenosis -- self-emptying. He emphasizes the Centers of Intelligence more than many teachers and consistently returns to the theme that the Enneagram's purpose is transformation, not self-understanding.",books:[{title:"The Enneagram: A Christian Perspective",note:"Written with Andreas Ebert. The most theologically grounded introduction."},{title:"Breathing Under Water",note:"Not explicitly an Enneagram book, but essential Rohr."},{title:"Falling Upward",note:"His theology of the two halves of life."}],podcasts:[{title:"Center for Action and Contemplation Podcast",note:"Rohr's primary platform."},{title:"Typology Podcast -- Episode with Richard Rohr",note:"A clear, accessible interview covering Rohr's core Enneagram philosophy."}]},
  {id:"stabile",name:"Suzanne Stabile",color:"#9a9aca",dates:"b. 1951",tradition:"Lay teacher, Methodist and ecumenical context",tagline:"The Enneagram as a tool for relationship and mercy",overview:"Stabile studied under Rohr beginning in the early 1980s and emerged as perhaps the most gifted communicator in the Enneagram world. She is particularly focused on the relational dimensions of the Enneagram -- how types interact, misunderstand each other, and can offer each other genuine transformation.",distinctives:"Stabile is the foremost teacher of type-to-type relationship dynamics. Her book The Path Between Us is the definitive text on how the nine types relate to each other.",books:[{title:"The Road Back to You",note:"Co-authored with Ian Morgan Cron. The most widely read introduction to the Enneagram."},{title:"The Path Between Us",note:"The essential text on how the nine types relate to each other."},{title:"The Enneagram of Belonging",note:"Her most personal and theologically rich book."}],podcasts:[{title:"Enneagram Journey Podcast",note:"Stabile's own podcast."},{title:"With and For Podcast -- Stabile episodes",note:"Several deep-dive conversations on type and transformation."}]},
  {id:"cron",name:"Ian Morgan Cron",color:"#6a9aba",dates:"b. 1960",tradition:"Episcopal priest and therapist",tagline:"The Enneagram for the spiritually curious and emotionally honest",overview:"Cron co-authored The Road Back to You with Stabile, which became the bestselling Enneagram book in history. His background as both a priest and a therapist gives his work a quality that is simultaneously accessible and psychologically serious.",distinctives:"Cron brings a clinical sensibility to accessible writing. His descriptions of each type consistently include the specific emotional texture of childhood.",books:[{title:"The Road Back to You",note:"Co-authored with Stabile. The ideal starting point for most readers."},{title:"The Story of You",note:"On how your Enneagram type shapes the story you tell about yourself."},{title:"Chasing Francis",note:"A novel about a burned-out evangelical pastor who discovers Franciscan spirituality."}],podcasts:[{title:"Typology Podcast",note:"Cron's long-running podcast. Over 200 episodes."}]},
  {id:"riso",name:"Don Riso and Russ Hudson",color:"#8a9a5a",dates:"Riso: 1946-2012. Hudson: b. 1956",tradition:"Psychological and humanistic",tagline:"The Enneagram as a map of psychological development",overview:"Don Riso and Russ Hudson produced the most psychologically rigorous body of Enneagram scholarship in the field. Their development of the Levels of Development framework fundamentally transformed the system from a static typology into a dynamic map of psychological health.",distinctives:"The Levels of Development are their most significant contribution: nine levels of health for each type, from the most integrated expression to the most pathological.",books:[{title:"The Wisdom of the Enneagram",note:"The most comprehensive, psychologically rigorous treatment."},{title:"Personality Types",note:"The original systematic treatment."},{title:"Understanding the Enneagram",note:"A practical guide to using the Levels in daily life."}],podcasts:[{title:"Russ Hudson interviews and lectures (YouTube)",note:"Hudson's talks are widely available."}]},
  {id:"chestnut",name:"Beatrice Chestnut",color:"#aa8a6a",dates:"b. 1965",tradition:"Psychotherapist and executive coach",tagline:"The Enneagram at maximum precision: the 27 subtypes",overview:"Beatrice Chestnut is the foremost scholar of the instinctual subtypes -- the 27 distinct characters produced by the intersection of nine Enneagram types with three instinctual drives.",distinctives:"Chestnut is the only major teacher whose primary contribution is the subtype system. She insists that the subtypes are not optional additions but essential refinements.",books:[{title:"The Complete Enneagram",note:"The definitive text on the 27 subtypes."},{title:"The 9 Types of Leadership",note:"Applies the Enneagram to organizational contexts."}],podcasts:[{title:"Beatrice Chestnut interviews (YouTube and various podcasts)",note:"Chestnut is a clear and precise speaker."}]}
];

const mediaRecs = {
  general:{
    books:[
      {title:"The Road Back to You",author:"Ian Morgan Cron and Suzanne Stabile",note:"The best starting point for most people.",url:"https://www.amazon.com/dp/0830846190"},
      {title:"The Wisdom of the Enneagram",author:"Don Riso and Russ Hudson",note:"The most psychologically rigorous treatment available.",url:"https://www.amazon.com/dp/0553378201"},
      {title:"The Complete Enneagram",author:"Beatrice Chestnut",note:"The definitive guide to the 27 subtypes.",url:"https://www.amazon.com/dp/1938314549"},
      {title:"The Path Between Us",author:"Suzanne Stabile",note:"The best book on how the types relate to each other.",url:"https://www.amazon.com/dp/0830846425"},
      {title:"The Enneagram: A Christian Perspective",author:"Richard Rohr and Andreas Ebert",note:"The most theologically grounded treatment.",url:"https://www.amazon.com/dp/0824519507"}
    ],
    podcasts:[
      {title:"Typology",host:"Ian Morgan Cron",note:"Over 200 episodes. One of the best ways to hear the types in action.",url:"https://iancmorgancron.com/typology"},
      {title:"Enneagram Journey",host:"Suzanne Stabile",note:"Stabile at her best -- rich, pastoral, and deeply practical.",url:"https://suzannestabile.com/enneagram-journey-podcast/"},
      {title:"The Enneagram and Coffee",host:"Sarajane Case",note:"Accessible and popular. A good entry point.",url:"https://sarajanecase.com/podcast/"},
      {title:"Fathoms: An Enneagram Podcast",host:"Various",note:"More academically oriented.",url:"https://podcasts.apple.com/us/podcast/fathoms-an-enneagram-podcast/id1439743076"}
    ],
    youtube:[
      {title:"Richard Rohr: The Enneagram as a Tool for Transformation",note:"Rohr's foundational lecture. Essential viewing.",url:"https://www.youtube.com/results?search_query=richard+rohr+enneagram+transformation"},
      {title:"Russ Hudson: Talks on the Enneagram",note:"Hudson's lectures on specific types and the Levels of Development.",url:"https://www.youtube.com/results?search_query=russ+hudson+enneagram"},
      {title:"Suzanne Stabile: The Path Between Us",note:"Her talk on type relationships. Funny, wise, and immediately practical.",url:"https://www.youtube.com/results?search_query=suzanne+stabile+enneagram+path+between+us"},
      {title:"Beatrice Chestnut: The 27 Subtypes",note:"The clearest available introduction to Chestnut's work.",url:"https://www.youtube.com/results?search_query=beatrice+chestnut+enneagram+subtypes"}
    ]
  },
  byType:{
    1:{books:[{title:"The Enneagram: A Christian Perspective (Rohr/Ebert)",note:"Rohr writes about Ones with particular depth and compassion.",url:"https://www.amazon.com/dp/0824519507"},{title:"Boundaries (Cloud/Townsend)",note:"Practical tools for the One's tendency to carry too much.",url:"https://www.amazon.com/dp/0310247454"},{title:"The Gifts of Imperfection (Brene Brown)",note:"Directly addresses the perfectionism and shame at the core of the One wound.",url:"https://www.amazon.com/dp/159285849X"}],podcasts:[{title:"Typology: Type One episodes",note:"Particularly the episode on the One's relationship to anger.",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The One as Reformer",note:"Stabile on the One's inner critic and the path to serenity.",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Russ Hudson on Type One",note:"His description of the One's inner critic is the clearest available.",url:"https://www.youtube.com/results?search_query=russ+hudson+enneagram+type+one"}]},
    2:{books:[{title:"The Road Back to You (Cron/Stabile)",note:"The Two chapter is among the most compassionate descriptions of the type.",url:"https://www.amazon.com/dp/0830846190"},{title:"Codependent No More (Melody Beattie)",note:"Not explicitly Enneagram but directly relevant to the Two's wound.",url:"https://www.amazon.com/dp/0894864025"},{title:"The Gifts of Imperfection (Brene Brown)",note:"On receiving love without earning it.",url:"https://www.amazon.com/dp/159285849X"}],podcasts:[{title:"Typology: Type Two episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Two as Helper",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Suzanne Stabile on the Two in relationships",url:"https://www.youtube.com/results?search_query=suzanne+stabile+enneagram+type+two"}]},
    3:{books:[{title:"The Wisdom of the Enneagram (Riso/Hudson)",url:"https://www.amazon.com/dp/0553378201"},{title:"Daring Greatly (Brene Brown)",url:"https://www.amazon.com/dp/1592408419"},{title:"The Road Back to You (Cron/Stabile)",url:"https://www.amazon.com/dp/0830846190"}],podcasts:[{title:"Typology: Type Three episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Three as Achiever",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Ian Morgan Cron on the Three's wound",url:"https://www.youtube.com/results?search_query=ian+morgan+cron+enneagram+type+three"}]},
    4:{books:[{title:"The Complete Enneagram (Chestnut)",url:"https://www.amazon.com/dp/1938314549"},{title:"Dark Nights of the Soul (Thomas Moore)",url:"https://www.amazon.com/dp/1592401538"},{title:"The Wisdom of the Enneagram (Riso/Hudson)",url:"https://www.amazon.com/dp/0553378201"}],podcasts:[{title:"Typology: Type Four episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Four as Individualist",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Beatrice Chestnut on the sp Four",url:"https://www.youtube.com/results?search_query=beatrice+chestnut+enneagram+type+four+self+preservation"}]},
    5:{books:[{title:"The Complete Enneagram (Chestnut)",url:"https://www.amazon.com/dp/1938314549"},{title:"Quiet (Susan Cain)",url:"https://www.amazon.com/dp/0307352153"},{title:"The Wisdom of the Enneagram (Riso/Hudson)",url:"https://www.amazon.com/dp/0553378201"}],podcasts:[{title:"Typology: Type Five episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Five as Investigator",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Russ Hudson on the Five's relationship to depletion",url:"https://www.youtube.com/results?search_query=russ+hudson+enneagram+type+five"}]},
    6:{books:[{title:"The Wisdom of the Enneagram (Riso/Hudson)",url:"https://www.amazon.com/dp/0553378201"},{title:"The Courage to Be (Paul Tillich)",url:"https://www.amazon.com/dp/0300084714"},{title:"The Complete Enneagram (Chestnut)",url:"https://www.amazon.com/dp/1938314549"}],podcasts:[{title:"Typology: Type Six episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Six as Loyalist",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Beatrice Chestnut on the three Six subtypes",url:"https://www.youtube.com/results?search_query=beatrice+chestnut+enneagram+type+six+subtypes"}]},
    7:{books:[{title:"The Road Back to You (Cron/Stabile)",url:"https://www.amazon.com/dp/0830846190"},{title:"The Wisdom of the Enneagram (Riso/Hudson)",url:"https://www.amazon.com/dp/0553378201"},{title:"Full Catastrophe Living (Jon Kabat-Zinn)",url:"https://www.amazon.com/dp/0345536932"}],podcasts:[{title:"Typology: Type Seven episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Seven as Enthusiast",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Russ Hudson on the Seven's relationship to pain",url:"https://www.youtube.com/results?search_query=russ+hudson+enneagram+type+seven"}]},
    8:{books:[{title:"The Wisdom of the Enneagram (Riso/Hudson)",url:"https://www.amazon.com/dp/0553378201"},{title:"Daring Greatly (Brene Brown)",url:"https://www.amazon.com/dp/1592408419"},{title:"The Complete Enneagram (Chestnut)",url:"https://www.amazon.com/dp/1938314549"}],podcasts:[{title:"Typology: Type Eight episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Eight as Challenger",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Richard Rohr on the Eight's hidden tenderness",url:"https://www.youtube.com/results?search_query=richard+rohr+enneagram+type+eight"}]},
    9:{books:[{title:"The Road Back to You (Cron/Stabile)",url:"https://www.amazon.com/dp/0830846190"},{title:"The Wisdom of the Enneagram (Riso/Hudson)",url:"https://www.amazon.com/dp/0553378201"},{title:"Boundaries (Cloud/Townsend)",url:"https://www.amazon.com/dp/0310247454"}],podcasts:[{title:"Typology: Type Nine episodes",url:"https://iancmorgancron.com/typology"},{title:"Enneagram Journey: The Nine as Peacemaker",url:"https://suzannestabile.com/enneagram-journey-podcast/"}],youtube:[{title:"Suzanne Stabile on the Nine's invisibility",url:"https://www.youtube.com/results?search_query=suzanne+stabile+enneagram+type+nine"}]}
  }
};

const quizStatements = {
  1:["People have told me I can be overly critical and judgmental.","I beat myself up when I make mistakes.","I don't feel comfortable when I try to relax. There is too much to be done.","I don't like it when people ignore or break the rules.","Details are important to me.","I often find myself comparing myself to others.","If I say I'll do it, I'll do it.","It is hard for me to let go of resentment.","I think it is my responsibility to leave the world better than I found it.","I have a lot of self-discipline.","I try to be careful and thoughtful about how I am spending money.","It seems to me that things are either right or wrong.","I spend a lot of time thinking about how I could be a better person.","Forgiveness is hard for me.","I notice immediately when things are wrong or out of place.","I worry a lot.","I am really disappointed when other people don't do their part.","I like routine and don't readily embrace change.","I do my best when working on a project, and I wish others would do the same.","I often feel like I try harder than others to do things correctly."],
  2:["When it comes to taking care of others, I don't know how or when to say no.","I am a great listener, and I remember the stories that make up people's lives.","I am anxious to overcome misunderstandings in a relationship.","I feel drawn to influential or powerful people.","People think I'm psychic because I usually know what other people need or want.","Even people I don't know well share deep stuff about their lives with me.","It seems like people who love me should already know what I need.","I need to be acknowledged and appreciated for my contributions.","I'm more comfortable giving than receiving.","I like my home to feel like a safe and welcoming place for family and others.","I care a great deal about what people think of me.","I want other people to think I love everyone, even though I don't.","I like it when the people who love me do something unexpected for me.","Lots of people ask me for help, and it makes me feel valuable.","When people ask me what I need, I have no idea how to answer.","When I'm tired, I often feel like people take me for granted.","People say my emotions are over-the-top.","I feel angry and conflicted when my needs conflict with others.","Sometimes it is hard for me to watch movies because I find it almost unbearable to see people suffer.","I worry a lot about being forgiven when I make mistakes."],
  3:["It's important for me to come across as a winner.","I love walking in a room and knowing I'm making a great first impression.","I could persuade almost anyone to see things my way.","The keys to my happiness are efficiency, productivity, and being acknowledged as the best.","I don't like it when people slow me down.","I know how to reframe failure to look like success.","I'd rather lead than follow any day.","I am competitive to a fault.","I can find a way to win over and connect with just about anyone.","I'm a world-champion multitasker.","I keep a close watch on how people are responding to me in the moment.","It's hard for me not to take work along on vacation.","It's hard for me to name and access my feelings.","I'm not one to talk much about my personal life.","Sometimes I feel like a phony.","I love setting and accomplishing measurable goals.","I like other people to know about my accomplishments.","I like to be seen in the company of successful people.","I don't mind cutting corners if it gets the job done more efficiently.","People say I don't know how or when to stop working."],
  4:["I like things that are unconventional, dramatic, and refined.","I never really felt like I belonged.","I have so many feelings in a day it's hard to know which ones to pay attention to first.","Some people think I am aloof, but I'm really just unique.","In social situations I tend to hang back and wait for others to approach me.","Melancholy is comfortable for me, so it's annoying when people try to cheer me up.","I'm not like everyone else -- and I'm relieved.","I'm very sensitive to criticism, and it takes me a while to get over it.","I spend a lot of time trying to explain myself.","When people tell me what to do, I'm often tempted to do the opposite.","Sometimes I just disappear and go radio silent for a few days.","I'm okay with sad songs, sad stories, and sad movies. Overly happy people give me a headache.","I feel there is something essential lacking in me.","It's really hard for me to settle into a relationship because I'm always looking for my soulmate.","I'm self-conscious. It's hard for me to find my place in a room full of people.","People say I'm too intense and my feelings overwhelm them.","I'm either an artist or highly creative -- but executing ideas is the hard part.","Lots of people misunderstand me, and it makes me frustrated.","I pull people in, but then I get nervous and push them away.","I worry a lot about abandonment."],
  5:["I can take care of myself, and I think others could do the same.","I don't always say things out loud, but in my head I am pretty sarcastic and cynical.","I often feel awkward around other people.","I'm okay if people ask me a few specific questions about myself, but I don't like it when people want too much information.","I need time alone.","If I want people to know how I feel I will tell them. I generally wish they wouldn't ask.","I think thoughts are more reliable than feelings.","I need a couple of days to process an experience or know how I feel about something.","People are wasteful. I hold on to what I have.","Often I find that I would rather observe than participate.","I trust myself -- I think about things for a while and then I make my own decisions.","I can't understand why people get together just to hang out.","I'm a listener.","I have to be very careful with my time and energy.","I get tired when I have to be with people for too long.","I often felt invisible as a child. Sometimes as an adult I choose to be invisible.","Sometimes I think I should be more generous. It's hard for me.","In groups, being uninformed makes me very uncomfortable.","I don't like big social gatherings. I'd rather be with a few people.","Material possessions don't make me happy."],
  6:["I'm always imagining and planning for the worst.","I often don't trust people who are in authority.","People say I am loyal, understanding, funny, and compassionate.","Most of my friends don't have as much anxiety as I do.","I act quickly in a crisis, but when things settle down, I fall apart.","When my partner and I are doing really well, I find myself wondering what will happen to spoil it.","Being sure I've made the right decision is almost impossible.","I'm aware that fear has dictated many of my choices in life.","I don't like to find myself in unpredictable situations.","I find it hard to stop thinking about the things I am worried about.","I'm generally not comfortable with extremes.","I usually have so much to do it's hard for me to finish tasks.","I'm most comfortable when I'm around people who are pretty much like me.","People tell me I can be overly pessimistic.","I am slow to start, and once I do, I keep thinking about what could go wrong.","I don't trust people who give me too many compliments.","It helps me to have things in some kind of order.","I like to be told I am good at my job, but I get nervous when my boss wants to add to my responsibilities.","I have to know people for a long time before I can really trust them.","I am skeptical of things that are new and unknown."],
  7:["I'm always the first person up for a last-minute adventure.","I am an optimist to a fault.","I don't like making hard and fast commitments to things.","I suffer from FOMO -- fear of missing out.","Anticipation is the best part of life.","People close to me say I can be argumentative and act superior.","Variety and spontaneity are the spice of life.","Sometimes I get so eager for the future I can hardly wait for it to get here.","It's hard for me to finish things. When I get close to the end, I start thinking about the next thing.","I usually avoid heavy conversations and confrontations.","When people I care about are having a hard time, I help them look at the bright side.","Other people think I am sure of myself, but I have lots of doubts.","I'm popular and have lots of friends.","When things get too serious, I usually find a way to get people to lighten up.","I don't like endings, so I usually wait for people to end things.","I quickly get bored with the same routine and like to try new things.","Almost everything can be more fun and entertaining with a little effort.","I think people worry more than they should.","Life is better than people imagine. It's all about how you explain things to yourself.","I don't like it when people have expectations of me."],
  8:["I have been told that I am too blunt and aggressive.","Doing things halfway is not my spiritual gift.","I enjoy a good verbal skirmish, just to see what others are made of.","In relationships that matter to me, I insist on being honest about conflicts and staying in the fight till things are worked out.","It's hard for me to trust people.","Justice is worth fighting for.","I can sniff out other people's weaknesses the first time I meet them.","Saying no isn't a problem for me.","I welcome opposition. Bring it.","I make decisions fast and from the gut.","I don't like it when people beat around the bush.","I'm wary of people who are super nice.","When I walk into a room, I know immediately who has the most power.","I don't have much respect for people who don't stand up for themselves.","One of my mottos is a good offense is better than a good defense.","Don't mess with the people I love.","I know I'm respected. But sometimes I want to be loved.","I have no problem confronting a bully.","If God wanted people to wear their hearts on their sleeve, he would have put it there.","Under my tough exterior is a tender, loving heart."],
  9:["I'd do almost anything to avoid conflict.","I am not a self-starter.","Sometimes I get lost in doing trivial tasks, while things that really need to get done get put off.","I'm happy to go along with what others want to do.","I tend to procrastinate.","People seem to want me to be more decisive.","When I get distracted and go off task, I give my attention to whatever is happening right in front of me.","I often choose the path of least resistance.","I find routines at work and home comforting, and I feel unsettled when something throws me off.","Others see me as more peaceful than I really am.","I have a hard time getting started, but once I do, I really get things done.","I'm a what you see is what you get person.","I don't think of myself as being very important.","People think I am a good listener even though I find it hard to pay attention in a long conversation.","I don't like to take work home with me.","Sometimes I tune out and think about the past.","I don't enjoy social gatherings as much as a quiet evening at home with the ones I love.","Being outdoors is very soothing for me.","I am often quietly stubborn when people put demands on me.","It would feel selfish to spend a whole day doing whatever I want to do."]
};

const sameTypePairings = {
  1:{gifts:"Two Ones can create something genuinely excellent together. They share a commitment to quality, integrity, and doing things right, and they rarely have to explain their standards to each other.",friction:"The inner critic doubles. Each One's resentment and high standards now has a mirror -- and neither is particularly practiced at receiving criticism.",growth:"Each One needs to learn to extend to the other the grace they would extend to someone they are trying to help.",rohr:"Rohr would say two Ones together face the same invitation as any One: to discover that love is not contingent on getting it right.",stabile:"Stabile notes that two Ones either inspire each other toward genuine virtue or exhaust each other with the weight of shared perfectionism."},
  2:{gifts:"Two Twos can create a relationship of extraordinary warmth, attentiveness, and mutual care. Each knows instinctively how to make the other feel seen and valued.",friction:"Neither knows how to receive. Both are practiced givers and unpracticed receivers.",growth:"The practice for two Twos is the hardest thing either type faces: asking for what you need. Not hinting, not giving in order to receive. Directly asking.",rohr:"Rohr would say two Twos together have a rare opportunity -- to discover what it feels like to be loved without having earned it.",stabile:"Stabile says: two Twos in a room is the warmest room you will ever be in. It is also a room where two people are quietly waiting for someone to ask how they are doing."},
  3:{gifts:"Two Threes can be a formidable, energized, high-achieving pair. They understand each other's drive, respect each other's competence, and rarely have to explain why success matters.",friction:"Both are performing. Both are image-conscious. Neither is particularly practiced at being known without their achievements.",growth:"The invitation for two Threes is the scariest thing either type faces: being seen without the performance.",rohr:"Rohr would say two Threes together face the question that haunts each of them alone: who are you when you fail?",stabile:"Stabile says: two Threes will build something impressive. The question is whether they ever stop building long enough to find out who they are to each other."},
  4:{gifts:"Two Fours can achieve a depth of emotional honesty and mutual understanding that is genuinely rare.",friction:"The longing doubles. The push-pull doubles. Both Fours may withdraw at the same time, leaving no one to initiate.",growth:"Two Fours together need to practice the ordinary -- the unremarkable continuity that the Four's longing tends to devalue.",rohr:"Rohr would say two Fours together have both the gift and the trap of emotional depth.",stabile:"Stabile says: two Fours in a relationship can be one of the most beautiful and most exhausting things on the Enneagram."},
  5:{gifts:"Two Fives can create a relationship of remarkable intellectual depth, mutual respect, and genuine peace. Neither intrudes on the other's space.",friction:"The withdrawal doubles. Both Fives can retreat at the same time, and no one comes forward.",growth:"Two Fives together need to practice initiating. Not just being available when the other reaches out, but actually moving toward each other.",rohr:"Rohr would say two Fives together face the invitation that each Five faces alone: to step through the glass and risk being depleted.",stabile:"Stabile says: two Fives in a relationship is the quietest relationship on the Enneagram."},
  6:{gifts:"Two Sixes can create a relationship of extraordinary loyalty, mutual commitment, and genuine security.",friction:"The anxiety compounds. Both Sixes are scanning for threats, and when they are in their patterns simultaneously, each can amplify the other's worry.",growth:"Two Sixes together need to practice naming the anxiety rather than acting it out.",rohr:"Rohr would say two Sixes together face the invitation to find their inner authority.",stabile:"Stabile says: two Sixes together is the most loyal pairing on the Enneagram."},
  7:{gifts:"Two Sevens can be genuinely joyful, adventurous, and alive together.",friction:"Both are avoiding something. The motion stays high, the depth stays low.",growth:"Two Sevens together need to practice stopping. Not planning the next thing. Just staying.",rohr:"Rohr would say two Sevens together have the ingredients for genuine joy -- but only if they are willing to discover that depth is where it actually lives.",stabile:"Stabile says: two Sevens together will have the most fun of any pairing on the Enneagram. The question is whether they ever let it get real."},
  8:{gifts:"Two Eights can be a formidable, deeply loyal, and intensely alive pair. The honesty between them can be remarkable.",friction:"The force doubles. A conflict between two Eights can escalate quickly.",growth:"Two Eights together need to practice the thing each Eight faces alone: letting someone in.",rohr:"Rohr would say two Eights together have the potential to discover what lies beneath the armor.",stabile:"Stabile says: two Eights together is either the most honest relationship on the Enneagram or a war."},
  9:{gifts:"Two Nines can create a relationship of extraordinary peace, acceptance, and genuine ease.",friction:"Both disappear. Both accommodate. Both say yes when they mean something else.",growth:"Two Nines together need to practice the hardest thing for either of them: saying what they actually want.",rohr:"Rohr would say two Nines together face the same invitation as every Nine: to remember that they exist.",stabile:"Stabile says: two Nines together is the most peaceful relationship on the Enneagram. It is also the most at risk of mistaking the absence of conflict for the presence of intimacy."}
};

const calcPos = (cx,cy,r) => {
  const p = {};
  [9,1,2,3,4,5,6,7,8].forEach((t,i) => {
    const a = ((i*40)-90)*Math.PI/180;
    p[t] = {x:cx+r*Math.cos(a), y:cy+r*Math.sin(a)};
  });
  return p;
};

const FadeIn = ({children}) => {
  const [op,setOp] = useState(0);
  useEffect(() => { const t = setTimeout(()=>setOp(1),20); return ()=>clearTimeout(t); },[]);
  return <div style={{opacity:op,transition:"opacity 0.35s ease"}}>{children}</div>;
};

const AnimBar = ({pct,color,delay=0}) => {
  const [w,setW] = useState(0);
  useEffect(() => { const t = setTimeout(()=>setW(pct),delay+80); return ()=>clearTimeout(t); },[pct,delay]);
  return (
    <div style={{height:"4px",backgroundColor:C.border,borderRadius:"2px"}}>
      <div style={{height:"100%",width:w+"%",backgroundColor:color,borderRadius:"2px",transition:"width 0.7s cubic-bezier(0.4,0,0.2,1)"}}/>
    </div>
  );
};

export default function App() {
  const [view,setView] = useState("home");
  const [quizPhase,setQuizPhase] = useState(1);
  const [quizPage,setQuizPage] = useState(0);
  const [checked,setChecked] = useState({});
  const [result,setResult] = useState(null);
  const [showRestart,setShowRestart] = useState(false);
  const [selectedType,setSelectedType] = useState(null);
  const [relType1,setRelType1] = useState(null);
  const [relType2,setRelType2] = useState(null);
  const [profileTab,setProfileTab] = useState("overview");
  const [prevView,setPrevView] = useState("map");
  const [hoveredType,setHoveredType] = useState(null);
  const [quizVisible,setQuizVisible] = useState(true);
  const [resultStage,setResultStage] = useState(0);
  const [phase2Stmts,setPhase2Stmts] = useState([]);
  const [activeTriad,setActiveTriad] = useState("gut");
  const [subtypeType,setSubtypeType] = useState(null);
  const [subtypeInstinct,setSubtypeInstinct] = useState(null);
  const [selectedScholar,setSelectedScholar] = useState(null);
  const [mediaTab,setMediaTab] = useState("general");
  const [mediaTypeFilter,setMediaTypeFilter] = useState(null);
  // profile-embedded state
  const [profileSubInstinct,setProfileSubInstinct] = useState(null);
  const [profileRelOther,setProfileRelOther] = useState(null);
  const [profileMistypeExpanded,setProfileMistypeExpanded] = useState(null);

  const [phase1Stmts] = useState(() => {
    const arr = [];
    Object.entries(quizStatements).forEach(([type,stmts]) => {
      [0,2,5,9,14].forEach(i => arr.push({type:parseInt(type),idx:i,text:stmts[i]}));
    });
    for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
    return arr;
  });

  const activeStmts = quizPhase===1 ? phase1Stmts : phase2Stmts;

  const calcScores = (chk) => {
    const scores = {};
    [1,2,3,4,5,6,7,8,9].forEach(t => {
      scores[t] = quizStatements[t].reduce((s,_,i) => { const v=chk[t+"-"+i]; return s+(v!==undefined?v:0); },0);
    });
    return scores;
  };

  const buildPhase2 = (chk) => {
    const scores = calcScores(chk);
    const topTypes = Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([t])=>parseInt(t));
    const arr = [];
    topTypes.forEach(t => {
      quizStatements[t].forEach((text,idx) => {
        if(chk[t+"-"+idx]===undefined) arr.push({type:t,idx,text});
      });
    });
    for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
    return arr.slice(0,40);
  };

  const handleAnswer = (val) => {
    setQuizVisible(false);
    setTimeout(() => {
      const stmt = activeStmts[quizPage];
      const key = stmt.type+"-"+stmt.idx;
      const nc = {...checked,[key]:val};
      setChecked(nc);
      const next = quizPage+1;
      if(next>=activeStmts.length) {
        if(quizPhase===1) {
          const p2 = buildPhase2(nc);
          setPhase2Stmts(p2);
          setQuizPhase(2);
          setQuizPage(0);
          setQuizVisible(true);
        } else {
          setResult(Object.entries(calcScores(nc)).sort((a,b)=>b[1]-a[1]));
          setResultStage(0);
          setView("result");
        }
      } else {
        setQuizPage(next);
        setQuizVisible(true);
      }
    },220);
  };

  const confirmRestart = () => {
    setChecked({});setQuizPage(0);setResult(null);setShowRestart(false);
    setQuizVisible(true);setQuizPhase(1);setPhase2Stmts([]);setResultStage(0);
    setView("quiz-intro");
  };

  const openProfile = (t) => {
    setSelectedType(t);
    setProfileTab("overview");
    setProfileSubInstinct(null);
    setProfileRelOther(null);
    setProfileMistypeExpanded(null);
    setView("profile");
  };

  const s = {backgroundColor:C.bg,minHeight:"100vh",color:C.text,fontFamily:"Palatino,'Palatino Linotype','Book Antiqua',Georgia,serif",fontSize:"16px"};
  const pad = {padding:"20px 16px"};
  const maxW = {maxWidth:"660px",margin:"0 auto"};

  // Simplified nav -- profile page is now the hub for type-specific content
  const navItems = [
    {label:"Home",v:"home"},
    {label:"Quiz",v:"quiz-intro"},
    {label:"Map",v:"map"},
    {label:"Scholars",v:"scholars"},
    {label:"Resources",v:"media"},
    {label:"History",v:"beyond"},
  ];

  const NavBar = () => (
    <div style={{backgroundColor:C.surface+"ee",borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:100,backdropFilter:"blur(8px)"}}>
      <div style={{...maxW,display:"flex",alignItems:"center",gap:"2px",padding:"0 12px",overflowX:"auto"}}>
        {navItems.map(({label,v})=>{
          const active = view===v || (v==="quiz-intro" && view==="quiz") || (v==="map" && (view==="map"||view==="profile"||view==="triads"||view==="subtypes"||view==="relations"||view==="mistype-nav"||view?.startsWith("mistype-")));
          return (
            <button key={v} onClick={()=>setView(v)}
              style={{background:"none",border:"none",borderBottom:"2px solid "+(active?C.accent:"transparent"),color:active?C.accent:C.muted,cursor:"pointer",fontSize:"13px",fontFamily:"inherit",padding:"14px 10px",whiteSpace:"nowrap",transition:"all 0.15s",flexShrink:0}}>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const BottomNav = () => (
    <div style={{backgroundColor:C.surface+"ee",borderTop:"1px solid "+C.border,backdropFilter:"blur(8px)",marginTop:"48px"}}>
      <div style={{...maxW,display:"flex",alignItems:"center",gap:"2px",padding:"0 12px",overflowX:"auto"}}>
        {navItems.map(({label,v})=>{
          const active = view===v || (v==="quiz-intro" && view==="quiz") || (v==="map" && (view==="map"||view==="profile"||view==="triads"||view==="subtypes"||view==="relations"||view==="mistype-nav"||view?.startsWith("mistype-")));
          return (
            <button key={v} onClick={()=>setView(v)}
              style={{background:"none",border:"none",borderTop:"2px solid "+(active?C.accent:"transparent"),color:active?C.accent:C.muted,cursor:"pointer",fontSize:"13px",fontFamily:"inherit",padding:"14px 10px",whiteSpace:"nowrap",transition:"all 0.15s",flexShrink:0}}>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const BackBtn = ({to,label="Back"}) => (
    <button onClick={()=>setView(to)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:"14px",padding:"0 0 24px 0",display:"block",fontFamily:"inherit"}}>{"<- "+label}</button>
  );

  const Card = ({children,style={}}) => (
    <div style={{backgroundColor:C.card,border:"1px solid "+C.border,borderRadius:"10px",padding:"20px",...style}}>{children}</div>
  );

  const TypeBubble = ({t,size=26}) => (
    <span style={{backgroundColor:typeColors[t]+"44",border:"1px solid "+typeLightColors[t]+"66",color:typeLightColors[t],borderRadius:"50%",width:size+"px",height:size+"px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:size>30?"15px":"13px",flexShrink:0}}>{t}</span>
  );

  const EnneagramSVG = ({size=300,onTypeClick,interactive=false}) => {
    const vpad=36,vSize=size+(vpad*2),cx=vSize/2,cy=vSize/2,r=size*0.36;
    const pos = calcPos(cx,cy,r);
    const nr=14,fs=10,lr=r+nr+22;
    const labelPos = {};
    [9,1,2,3,4,5,6,7,8].forEach((t,i) => {
      const a=((i*40)-90)*Math.PI/180;
      labelPos[t]={x:cx+lr*Math.cos(a),y:cy+lr*Math.sin(a)};
    });
    const sName={1:"Reformer",2:"Helper",3:"Achiever",4:"Individualist",5:"Investigator",6:"Loyalist",7:"Enthusiast",8:"Challenger",9:"Peacemaker"};
    const hov = hoveredType;
    const getLC = (a,b) => {
      if(!hov) return C.border;
      if(hov===a||hov===b) {
        if(T[hov].stress===a||T[hov].stress===b) return "#aa6a6a";
        if(T[hov].security===a||T[hov].security===b) return "#6aaa6a";
        return C.border;
      }
      return C.border+"33";
    };
    return (
      <svg width={size} height={size} viewBox={"0 0 "+vSize+" "+vSize} style={{maxWidth:"100%"}}>
        <rect width={vSize} height={vSize} fill={C.bg}/>
        {[[1,4],[4,2],[2,8],[8,5],[5,7],[7,1]].map(([a,b],i)=><line key={"i"+i} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke={getLC(a,b)} strokeWidth="1" style={{transition:"stroke 0.2s"}}/>)}
        {[[3,6],[6,9],[9,3]].map(([a,b],i)=><line key={"t"+i} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke={getLC(a,b)} strokeWidth="1" style={{transition:"stroke 0.2s"}}/>)}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={hov?C.border+"44":C.border} strokeWidth="1"/>
        {[1,2,3,4,5,6,7,8,9].map(t => {
          const p=pos[t],sel=selectedType===t,isH=hov===t;
          const dim=hov&&!isH&&t!==T[hov].stress&&t!==T[hov].security&&!(T[hov].wings.includes(t));
          return (
            <g key={t} onClick={()=>onTypeClick&&onTypeClick(t)} onMouseEnter={()=>interactive&&setHoveredType(t)} onMouseLeave={()=>interactive&&setHoveredType(null)} style={{cursor:onTypeClick?"pointer":"default"}}>
              {isH&&<circle cx={p.x} cy={p.y} r={nr+6} fill={typeLightColors[t]+"18"}/>}
              <circle cx={p.x} cy={p.y} r={isH?nr+2:nr} fill={sel||isH?typeColors[t]:typeColors[t]+(dim?"22":"44")} stroke={typeLightColors[t]} strokeWidth={sel||isH?"2":"1"} style={{transition:"all 0.2s"}} opacity={dim?0.4:1}/>
              <text x={p.x} y={p.y+5} textAnchor="middle" fill={typeLightColors[t]} fontSize={nr} fontFamily="Georgia" opacity={dim?0.4:1}>{t}</text>
            </g>
          );
        })}
        {[1,2,3,4,5,6,7,8,9].map(t => {
          const lp=labelPos[t];
          const dim=hov&&hov!==t&&t!==T[hov].stress&&t!==T[hov].security&&!(T[hov].wings.includes(t));
          return <text key={"l"+t} x={lp.x} y={lp.y+4} textAnchor="middle" dominantBaseline="middle" fill={C.muted} fontSize={fs} fontFamily="Georgia" opacity={dim?0.3:1} style={{transition:"opacity 0.2s"}}>{sName[t]}</text>;
        })}
        {hov&&<g>
          <text x={cx} y={cy-8} textAnchor="middle" fill="#aa6a6a" fontSize="10" fontFamily="Georgia">{"stress "+T[hov].stress}</text>
          <text x={cx} y={cy+10} textAnchor="middle" fill="#6aaa6a" fontSize="10" fontFamily="Georgia">{"security "+T[hov].security}</text>
        </g>}
      </svg>
    );
  };

  // HOME
  if(view==="home") return (
    <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
      <div style={{textAlign:"center",paddingTop:"40px",marginBottom:"44px"}}>
        <h1 style={{fontSize:"30px",fontWeight:"normal",letterSpacing:"0.14em",marginBottom:"6px"}}>ENNEAGRAM</h1>
        <p style={{color:C.muted,fontSize:"12px",letterSpacing:"0.22em",marginBottom:"36px"}}>A TOOL FOR TRANSFORMATION</p>
        <div style={{display:"flex",justifyContent:"center",marginBottom:"14px",filter:"drop-shadow(0 0 32px rgba(184,149,106,0.12))"}}>
          <EnneagramSVG size={320} onTypeClick={t=>openProfile(t)} interactive={true}/>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"18px",flexWrap:"wrap",marginBottom:"44px"}}>
          {Object.entries(triads).map(([k,tr])=>{
            const clr=k==="gut"?C.gutLight:k==="heart"?C.heartLight:C.headLight;
            return(<div key={k} style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:"8px",height:"8px",borderRadius:"50%",backgroundColor:clr,opacity:0.8}}/><span style={{color:C.muted,fontSize:"12px"}}>{tr.label}</span></div>);
          })}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"14px",marginBottom:"44px"}}>
        {[
          {n:"Richard Rohr",t:"The Enneagram is a map of the human soul. It names nine ways the ego protects itself from the truth -- and nine paths back to who we were before the world told us who to be.",bl:"#b8956a44"},
          {n:"Suzanne Stabile",t:"The Enneagram does not put you in a box. It shows you the box you are already in -- and it offers you a way out. But first, you have to be willing to see it.",bl:"#9a9aca44"},
          {n:"Ian Morgan Cron",t:"The Enneagram is not a tool for judging others. It is a mirror. And mirrors do not lie -- which is why most of us avoid them, and why the bravest thing you can do is look.",bl:"#6a9aba44"},
          {n:"Don Riso and Russ Hudson",t:"The Enneagram is one of the most powerful tools for human understanding ever developed. But it must be used with humility -- it describes patterns of the false self, not the truth of who you are.",bl:"#8a9a5a44"}
        ].map(q=>(
          <div key={q.n} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"2px solid "+q.bl,borderRadius:"10px",padding:"20px"}}>
            <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.12em",marginBottom:"10px"}}>{q.n.toUpperCase()}</p>
            <p style={{color:C.muted,lineHeight:"1.85",fontStyle:"italic",fontSize:"15px"}}>{q.t}</p>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px",paddingBottom:"48px"}}>
        <button onClick={()=>setView("quiz-intro")} style={{backgroundColor:C.accent,color:C.bg,border:"none",padding:"16px",borderRadius:"8px",cursor:"pointer",fontSize:"17px",fontFamily:"inherit",letterSpacing:"0.06em"}}>Take the Quiz</button>
        <button onClick={()=>setView("map")} style={{backgroundColor:"transparent",color:C.accent,border:"1px solid "+C.accent,padding:"16px",borderRadius:"8px",cursor:"pointer",fontSize:"16px",fontFamily:"inherit"}}>Explore the Map</button>
        <button onClick={()=>setView("scholars")} style={{backgroundColor:"transparent",color:C.muted,border:"1px solid "+C.border,padding:"16px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>The Scholars</button>
        <button onClick={()=>setView("media")} style={{backgroundColor:"transparent",color:C.muted,border:"1px solid "+C.border,padding:"16px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>Books, Podcasts and Videos</button>
        <button onClick={()=>setView("beyond")} style={{backgroundColor:"transparent",color:C.muted,border:"1px solid "+C.border,padding:"16px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>A History of the Enneagram</button>
      </div>
    </div></FadeIn><BottomNav/></div>
  );

  // SCHOLARS
  if(view==="scholars") {
    const sc = selectedScholar ? scholars.find(s=>s.id===selectedScholar) : null;
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"8px"}}>THE VOICES</p>
        <h2 style={{fontSize:"24px",fontWeight:"normal",marginBottom:"8px"}}>The Scholars</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"28px",fontSize:"15px"}}>Five teachers, five distinct approaches. Understanding how they differ helps you know which voice to turn to for what you need.</p>
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"28px"}}>
          {scholars.map(s=>(
            <button key={s.id} onClick={()=>setSelectedScholar(selectedScholar===s.id?null:s.id)}
              style={{backgroundColor:selectedScholar===s.id?s.color+"18":"transparent",border:"1px solid "+(selectedScholar===s.id?s.color+"66":C.border),borderRadius:"10px",padding:"16px 18px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <p style={{color:selectedScholar===s.id?s.color:C.text,fontSize:"16px",marginBottom:"3px"}}>{s.name}</p>
                  <p style={{color:C.muted,fontSize:"12px"}}>{s.tagline}</p>
                </div>
                <span style={{color:C.muted,fontSize:"13px",marginLeft:"12px",flexShrink:0}}>{selectedScholar===s.id?"^":"v"}</span>
              </div>
              {selectedScholar===s.id&&sc&&(
                <div style={{marginTop:"16px",borderTop:"1px solid "+C.border,paddingTop:"16px"}}>
                  <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"14px"}}>
                    <span style={{color:C.muted,fontSize:"12px"}}>{sc.dates}</span>
                    <span style={{color:C.muted,fontSize:"12px"}}>{sc.tradition}</span>
                  </div>
                  <p style={{color:C.text,lineHeight:"1.85",fontSize:"14px",marginBottom:"16px"}}>{sc.overview}</p>
                  <div style={{backgroundColor:C.surface,borderRadius:"8px",padding:"14px",marginBottom:"14px"}}>
                    <p style={{color:s.color,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>WHAT MAKES THEM DISTINCTIVE</p>
                    <p style={{color:C.muted,lineHeight:"1.8",fontSize:"13px"}}>{sc.distinctives}</p>
                  </div>
                  <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>KEY BOOKS</p>
                  {sc.books.map((b,i)=>(
                    <div key={i} style={{marginBottom:"10px",paddingLeft:"12px",borderLeft:"2px solid "+s.color+"44"}}>
                      <p style={{color:C.text,fontSize:"14px",marginBottom:"3px"}}>{b.title}</p>
                      <p style={{color:C.muted,fontSize:"12px",lineHeight:"1.6"}}>{b.note}</p>
                    </div>
                  ))}
                  <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px",marginTop:"14px"}}>PODCASTS AND VIDEO</p>
                  {sc.podcasts.map((p,i)=>(
                    <div key={i} style={{marginBottom:"10px",paddingLeft:"12px",borderLeft:"2px solid "+s.color+"44"}}>
                      <p style={{color:C.text,fontSize:"14px",marginBottom:"3px"}}>{p.title}</p>
                      <p style={{color:C.muted,fontSize:"12px",lineHeight:"1.6"}}>{p.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
        <Card>
          <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"12px"}}>HOW THEY DIFFER</p>
          <p style={{color:C.muted,lineHeight:"1.85",fontSize:"14px",marginBottom:"10px"}}>Rohr is the theologian -- the Enneagram as a path of kenosis and contemplative transformation. Stabile is the pastor -- the Enneagram as a tool for mercy, relationship, and understanding the person in front of you. Cron is the therapist and storyteller -- the Enneagram as a map of the childhood wound and the path back to the self. Riso and Hudson are the psychologists -- the Enneagram as a spectrum of health, from integration to pathology. Chestnut is the specialist -- the Enneagram at its most precise, through the lens of the 27 subtypes.</p>
          <p style={{color:C.muted,lineHeight:"1.85",fontSize:"14px"}}>A good rule of thumb: if you want to know why your type matters spiritually, start with Rohr. If you want to understand how your type affects your relationships, go to Stabile. If you want to feel seen in your wound, read Cron. If you want psychological rigor and a map of health, use Riso and Hudson. If the standard type description feels slightly off, go to Chestnut.</p>
        </Card>
      </div></FadeIn><BottomNav/></div>
    );
  }

  // MEDIA
  if(view==="media") {
    const typeRec = mediaTab==="bytype" && mediaTypeFilter ? mediaRecs.byType[mediaTypeFilter] : null;
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"8px"}}>RESOURCES</p>
        <h2 style={{fontSize:"24px",fontWeight:"normal",marginBottom:"8px"}}>Books, Podcasts and Videos</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"24px",fontSize:"15px"}}>The best of the best -- curated for genuine transformation, not just information.</p>
        <div style={{display:"flex",gap:"8px",marginBottom:"24px"}}>
          {[["general","Essential Reading"],["bytype","By Type"]].map(([tab,lbl])=>(
            <button key={tab} onClick={()=>setMediaTab(tab)} style={{flex:1,padding:"10px",borderRadius:"8px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px",border:"1px solid "+(mediaTab===tab?C.accent+"88":C.border),backgroundColor:mediaTab===tab?C.accent+"18":"transparent",color:mediaTab===tab?C.accent:C.muted,transition:"all 0.2s"}}>{lbl}</button>
          ))}
        </div>
        {mediaTab==="general"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            {[["BOOKS",mediaRecs.general.books],["PODCASTS",mediaRecs.general.podcasts],["YOUTUBE AND VIDEO",mediaRecs.general.youtube]].map(([section,items])=>(
              <div key={section}>
                <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.12em",marginBottom:"12px"}}>{section}</p>
                <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  {items.map((item,i)=>(
                    <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                      <div style={{backgroundColor:C.card,border:"1px solid "+C.border,borderRadius:"8px",padding:"14px 16px",cursor:"pointer"}}
                        onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent+"66"}
                        onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px"}}>
                          <div style={{flex:1}}>
                            <p style={{color:C.text,fontSize:"15px",marginBottom:"4px"}}>{item.title}</p>
                            {item.author&&<p style={{color:C.accent,fontSize:"12px",marginBottom:"6px"}}>{item.author}</p>}
                            {item.host&&<p style={{color:C.accent,fontSize:"12px",marginBottom:"6px"}}>hosted by {item.host}</p>}
                            <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.65"}}>{item.note}</p>
                          </div>
                          <span style={{color:C.muted,fontSize:"16px",flexShrink:0,marginTop:"2px"}}>-&gt;</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {mediaTab==="bytype"&&(
          <div>
            <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>SELECT YOUR TYPE</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"6px",marginBottom:"24px"}}>
              {[1,2,3,4,5,6,7,8,9].map(n=>(
                <button key={n} onClick={()=>setMediaTypeFilter(mediaTypeFilter===n?null:n)}
                  style={{backgroundColor:mediaTypeFilter===n?typeColors[n]+"55":typeColors[n]+"22",border:"1px solid "+(mediaTypeFilter===n?typeLightColors[n]:typeColors[n]+"44"),color:mediaTypeFilter===n?typeLightColors[n]:C.muted,borderRadius:"6px",padding:"10px 4px",cursor:"pointer",fontSize:"12px",fontFamily:"inherit",transition:"all 0.15s"}}>
                  {n}. {T[n].name.replace("The ","")}
                </button>
              ))}
            </div>
            {typeRec&&(
              <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                {[["BOOKS",typeRec.books],["PODCASTS",typeRec.podcasts],["YOUTUBE AND VIDEO",typeRec.youtube]].map(([section,items])=>(
                  <div key={section}>
                    <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.12em",marginBottom:"12px"}}>{section}</p>
                    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                      {items.map((item,i)=>(
                        <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                          <div style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"3px solid "+typeLightColors[mediaTypeFilter],borderRadius:"8px",padding:"14px 16px",cursor:"pointer"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px"}}>
                              <div style={{flex:1}}>
                                <p style={{color:C.text,fontSize:"14px",marginBottom:"4px"}}>{item.title}</p>
                                <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.65"}}>{item.note}</p>
                              </div>
                              <span style={{color:C.muted,fontSize:"16px",flexShrink:0,marginTop:"2px"}}>-&gt;</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!mediaTypeFilter&&(
              <div style={{backgroundColor:C.surface,border:"1px solid "+C.border,borderRadius:"8px",padding:"16px"}}>
                <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.75"}}>Select a type above to see curated books, podcasts, and videos specifically relevant to that type.</p>
              </div>
            )}
          </div>
        )}
      </div></FadeIn><BottomNav/></div>
    );
  }

  // HISTORY
  if(view==="beyond") {
    const timeline = [
      {era:"Ancient and Medieval",period:"Pre-20th Century",color:"#8a7a5a",entries:[
        {date:"4th Century",title:"Evagrius Ponticus and the Eight Logismoi",body:"The earliest ancestor of the Enneagram's psychology may be found in the work of Evagrius Ponticus, a Christian monk and theologian writing in the Egyptian desert. Evagrius catalogued eight primary temptations of the soul as the root passions that distort the spiritual life. His list was later refined by Pope Gregory I into the Seven Deadly Sins."},
        {date:"13th Century",title:"Ramon Llull and the Nine-Pointed Figure",body:"The Majorcan philosopher Ramon Llull used a nine-pointed geometric figure in his philosophical and theological diagrams. Whether this figure has any direct lineage to the modern Enneagram symbol is debated, but it represents one of the earliest appearances of nine-fold geometric thinking in the Western mystical tradition."},
        {date:"15th to 17th Century",title:"Sufi Transmission Theories",body:"A persistent tradition holds that the Enneagram has roots in Sufi Islam, specifically in the Naqshbandi order of Central Asia. This claim was made most forcefully by George Gurdjieff. No written Sufi texts containing the Enneagram as a personality system have been verified, but the Sufi influence on the symbol's oral transmission remains a live possibility."}
      ]},
      {era:"Early 20th Century",period:"1900s to 1950s",color:"#7a6a4a",entries:[
        {date:"1912 to 1924",title:"George Gurdjieff Introduces the Symbol to the West",body:"The Greek-Armenian mystic George Ivanovich Gurdjieff introduced the nine-pointed Enneagram symbol to his students in Moscow and St. Petersburg around 1916, and later in Paris and New York. For Gurdjieff, the symbol was a universal diagram of cosmic processes, not a personality typology."},
        {date:"1950s",title:"Oscar Ichazo: The Personality Types Are Born",body:"The crucial step -- mapping nine personality types onto the symbol -- was taken by the Bolivian philosopher Oscar Ichazo in the 1950s and early 1960s. Ichazo developed a comprehensive system called the Arica School, integrating the symbol with ego fixations, passions, virtues, and holy ideas drawn from Kabbalah, Christian mysticism, Sufism, and his own spiritual experiences."}
      ]},
      {era:"The 1970s",period:"The Crucial Decade",color:"#6a7a5a",entries:[
        {date:"1970",title:"Claudio Naranjo and the Esalen Seminars",body:"The Chilean psychiatrist Claudio Naranjo attended Ichazo's intensive training in Arica, Chile in 1970. Naranjo had a background in Gestalt therapy, psychedelics research, and transpersonal psychology -- and he recognized in Ichazo's system a profound map of the neurotic character structures he had been studying clinically."},
        {date:"1971 to 1973",title:"The Jesuits Receive the Teaching",body:"Several of Naranjo's students were Jesuit seminarians, most notably Bob Ochs S.J., who brought the Enneagram into the Society of Jesus. The Jesuits recognized in the system something consonant with Ignatian discernment."},
        {date:"1973 to 1979",title:"An Oral Tradition in Religious Communities",body:"Throughout the 1970s, the Enneagram spread through Catholic retreat houses, seminaries, and formation programs as an almost entirely oral tradition. Richard Rohr encountered the Enneagram during this period."}
      ]},
      {era:"1980s",period:"From Secret to Print",color:"#5a7a6a",entries:[
        {date:"1984",title:"The First Book",body:"The first book on the Enneagram of personality was published in 1984: The Enneagram: A Journey of Self-Discovery, by Maria Beesing, Robert Nogosek, and Patrick O'Leary."},
        {date:"1987 to 1989",title:"Helen Palmer and Don Riso Bring It to the Mainstream",body:"Helen Palmer's The Enneagram brought a rigorous phenomenological approach. Don Richard Riso's Personality Types introduced the concept of levels of development."},
        {date:"1989",title:"Richard Rohr Begins Teaching Publicly",body:"Before he published a book on the subject, Richard Rohr began teaching the Enneagram publicly in workshops and on cassette tape, framing the system in explicitly Christian contemplative terms."}
      ]},
      {era:"1990s to 2000s",period:"Expansion and Controversy",color:"#5a6a7a",entries:[
        {date:"1990",title:"Riso and Hudson: The Levels Deepen",body:"Don Riso, later joined by Russ Hudson, continued developing the most psychologically rigorous strand of Enneagram teaching. Their work, culminating in The Wisdom of the Enneagram in 1999, established the levels of development framework."},
        {date:"1991",title:"The Vatican Controversy",body:"In 1991, the Vatican's Congregation for the Doctrine of the Faith issued a document cautioning against certain Eastern-influenced spiritual practices. While not naming the Enneagram explicitly, the document was interpreted by some as a warning against it."},
        {date:"1994",title:"Suzanne Stabile Begins Teaching",body:"Stabile had been studying the Enneagram under Richard Rohr since the early 1980s. By the mid-1990s she had become one of the most sought-after Enneagram teachers in the country."},
        {date:"1996",title:"Beatrice Chestnut and the Subtypes",body:"Beatrice Chestnut began developing the most comprehensive modern treatment of the 27 subtypes, constituting a major expansion of the system's descriptive power."}
      ]},
      {era:"2010s to Present",period:"The Popular Era",color:"#6a5a7a",entries:[
        {date:"2016",title:"The Road Back to You",body:"Ian Morgan Cron and Suzanne Stabile's The Road Back to You became the most widely read Enneagram book in history, introducing the system to an enormous new audience."},
        {date:"2017 to 2020",title:"The Enneagram Goes Viral",body:"Between 2017 and 2020, the Enneagram became a cultural phenomenon -- particularly among younger Christians and the broader wellness community. The danger that every major teacher had warned against -- using the system to explain and excuse rather than to transform -- became endemic."},
        {date:"Present",title:"Where the Enneagram Stands Now",body:"The Enneagram today exists in at least two parallel worlds. In one, it is a viral personality system. In the other, it remains what it has always been for its most serious teachers: a demanding map of the ego's strategies, useful only insofar as it is used for transformation rather than identification."}
      ]}
    ];
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"8px"}}>HISTORY</p>
        <h2 style={{fontSize:"26px",fontWeight:"normal",marginBottom:"8px"}}>A History of the Enneagram</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"40px",fontSize:"16px"}}>From desert monks to Bolivian mystics to Jesuit seminaries to Instagram memes -- the Enneagram has one of the stranger origin stories in the history of self-knowledge.</p>
        <div style={{display:"flex",flexDirection:"column",gap:"40px"}}>
          {timeline.map((era,ei)=>(
            <div key={ei}>
              <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
                <div style={{width:"10px",height:"10px",borderRadius:"50%",backgroundColor:era.color,flexShrink:0}}/>
                <div>
                  <p style={{color:era.color,fontSize:"13px",letterSpacing:"0.1em"}}>{era.era.toUpperCase()}</p>
                  <p style={{color:C.muted,fontSize:"12px"}}>{era.period}</p>
                </div>
              </div>
              <div style={{borderLeft:"1px solid "+era.color+"44",paddingLeft:"22px",display:"flex",flexDirection:"column",gap:"20px"}}>
                {era.entries.map((entry,i)=>(
                  <div key={i} style={{position:"relative"}}>
                    <div style={{position:"absolute",left:"-27px",top:"6px",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:C.bg,border:"1px solid "+era.color+"88"}}/>
                    <p style={{color:era.color,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"4px"}}>{entry.date.toUpperCase()}</p>
                    <p style={{color:C.text,fontSize:"16px",marginBottom:"10px",fontWeight:"normal"}}>{entry.title}</p>
                    <p style={{color:C.muted,lineHeight:"1.9",fontSize:"15px"}}>{entry.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid "+C.border,paddingTop:"28px",marginTop:"40px"}}>
          <p style={{color:C.muted,fontSize:"15px",lineHeight:"1.85",fontStyle:"italic",marginBottom:"16px"}}>The Enneagram does not put you in a box. It shows you the box you are already in -- and offers you a way out. But first, you have to be willing to see it. -- Suzanne Stabile</p>
          <p style={{color:C.muted,fontSize:"15px",lineHeight:"1.85",fontStyle:"italic"}}>The goal is not to become a better version of your type. The goal is to become free of your type. -- Richard Rohr</p>
        </div>
      </div></FadeIn><BottomNav/></div>
    );
  }

  // QUIZ INTRO
  if(view==="quiz-intro") return (
    <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad,paddingTop:"32px"}}>
      <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"8px"}}>THE QUIZ</p>
      <h2 style={{fontSize:"24px",fontWeight:"normal",marginBottom:"20px"}}>Before You Begin</h2>
      <div style={{display:"flex",flexDirection:"column",gap:"14px",marginBottom:"36px"}}>
        {[
          {title:"Two rounds",body:"Round 1 is a broad survey of all nine types -- 45 questions. Round 2 narrows to your top candidates with more targeted questions. Total: roughly 85 statements."},
          {title:"Answer as you are, not as you wish you were",body:"Think about how you actually behave under stress, in close relationships, when no one is watching."},
          {title:"The uncomfortable recognitions are usually the most true",body:"If a statement makes you wince a little, that is often a sign."},
          {title:"Type by motivation, not behavior",body:"Many types share surface behaviors. What matters is why you do what you do -- the inner drive, the fear underneath the action."}
        ].map((item,i)=>(
          <div key={i} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderRadius:"10px",padding:"18px 20px"}}>
            <p style={{color:C.text,fontSize:"15px",marginBottom:"6px"}}>{item.title}</p>
            <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.75"}}>{item.body}</p>
          </div>
        ))}
      </div>
      <button onClick={()=>{setQuizPage(0);setQuizPhase(1);setChecked({});setQuizVisible(true);setView("quiz");}} style={{width:"100%",backgroundColor:C.accent,color:C.bg,border:"none",padding:"16px",borderRadius:"8px",cursor:"pointer",fontSize:"17px",fontFamily:"inherit",letterSpacing:"0.06em"}}>Begin</button>
    </div></FadeIn></div>
  );

  // QUIZ
  if(view==="quiz") {
    if(showRestart) return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad,paddingTop:"60px",textAlign:"center"}}>
        <h2 style={{fontSize:"21px",fontWeight:"normal",marginBottom:"10px"}}>Start over?</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"32px"}}>
          {quizPhase===1?"Round 1, question "+(quizPage+1)+" of "+phase1Stmts.length+".":"Round 2, question "+(quizPage+1)+" of "+phase2Stmts.length+"."} Restarting will clear everything.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          <button onClick={confirmRestart} style={{backgroundColor:"#7a3a3a",color:C.text,border:"none",padding:"14px",borderRadius:"8px",cursor:"pointer",fontSize:"16px",fontFamily:"inherit"}}>Yes, restart</button>
          <button onClick={()=>setShowRestart(false)} style={{backgroundColor:"transparent",color:C.muted,border:"1px solid "+C.border,padding:"14px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>Keep going</button>
        </div>
      </div></FadeIn></div>
    );
    const total=activeStmts.length,pct=Math.round((quizPage/total)*100),stmt=activeStmts[quizPage];
    if(!stmt) return null;
    return (
      <div style={s}><NavBar/><div style={{...maxW,...pad}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
          <span style={{color:C.muted,fontSize:"14px"}}>Round {quizPhase} - {quizPage+1}/{total}</span>
          <button onClick={()=>setShowRestart(true)} style={{background:"none",border:"1px solid "+C.border,color:C.muted,borderRadius:"4px",padding:"3px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"inherit"}}>Restart</button>
        </div>
        <div style={{display:"flex",gap:"4px",marginBottom:"10px"}}>
          {[1,2].map(p=><div key={p} style={{flex:1,height:"2px",borderRadius:"1px",backgroundColor:quizPhase>p?C.accent:quizPhase===p?C.accent+"88":C.border,transition:"background-color 0.3s"}}/>)}
        </div>
        <div style={{height:"3px",backgroundColor:C.border,borderRadius:"2px",marginBottom:"4px"}}>
          <div style={{height:"100%",width:pct+"%",backgroundColor:quizPhase===1?C.accent:"#9a9aca",borderRadius:"2px",transition:"width 0.3s ease"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"48px"}}>
          <span style={{color:C.muted,fontSize:"11px"}}>{pct}% of this round</span>
          <span style={{color:C.muted,fontSize:"11px"}}>{total-quizPage} remaining</span>
        </div>
        <div style={{opacity:quizVisible?1:0,transform:quizVisible?"translateY(0)":"translateY(8px)",transition:"opacity 0.22s ease, transform 0.22s ease"}}>
          <p style={{color:quizPhase===1?C.muted:"#9a9aca",fontSize:"12px",letterSpacing:"0.12em",marginBottom:"16px"}}>{quizPhase===1?"DOES THIS DESCRIBE YOU?":"NARROWING IN"}</p>
          <h2 style={{fontSize:"19px",fontWeight:"normal",lineHeight:"1.8",color:C.text,marginBottom:"44px",minHeight:"96px"}}>"{stmt.text}"</h2>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {[{val:1,label:"Yes",bg:"#4a7a4a22",border:"#4a7a4a88",color:"#6aaa6a",hov:"#4a7a4a44"},{val:0.5,label:"Maybe",bg:"#4a4a6a22",border:"#6a6a9a88",color:"#9a9aca",hov:"#4a4a6a44"},{val:0,label:"No",bg:"#7a3a3a22",border:"#7a3a3a88",color:"#aa6a6a",hov:"#7a3a3a44"}].map(btn=>(
              <button key={btn.val} onClick={()=>handleAnswer(btn.val)}
                style={{padding:"18px",borderRadius:"10px",cursor:"pointer",backgroundColor:btn.bg,border:"1px solid "+btn.border,color:btn.color,fontSize:"17px",fontFamily:"inherit",transition:"background-color 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=btn.hov}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor=btn.bg}
              >{btn.label}</button>
            ))}
          </div>
        </div>
        {quizPage>0&&<button onClick={()=>{setQuizPage(quizPage-1);setQuizVisible(true);}} style={{marginTop:"20px",background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:"13px",display:"block",fontFamily:"inherit"}}>Previous</button>}
      </div></div>
    );
  }

  // RESULT
  if(view==="result"&&result) {
    const topType=parseInt(result[0][0]),topScore=result[0][1],maxScore=20;
    const tiedTypes=result.filter(([,sc])=>topScore-sc<=2).map(([t])=>parseInt(t));
    const hasTie=tiedTypes.length>1;
    const mPairs=[];
    for(let i=0;i<tiedTypes.length;i++) for(let j=i+1;j<tiedTypes.length;j++){const k=getMistypingKey(tiedTypes[i],tiedTypes[j]);if(k&&mistypings[k])mPairs.push({k,a:tiedTypes[i],b:tiedTypes[j]});}

    if(resultStage===0) return (
      <div style={{...s,backgroundColor:C.bg}}>
        <NavBar/>
        <div style={{background:"linear-gradient(180deg,"+typeColors[topType]+"55 0%,transparent 360px)"}}>
        <FadeIn><div style={{...maxW,...pad,paddingTop:"40px",textAlign:"center"}}>
          <p style={{color:C.text,fontSize:"12px",letterSpacing:"0.2em",marginBottom:"24px"}}>YOUR TYPE</p>
          <div style={{width:"80px",height:"80px",borderRadius:"50%",backgroundColor:typeColors[topType]+"44",border:"2px solid "+typeLightColors[topType],display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:"32px",color:typeLightColors[topType]}}>{topType}</div>
          <h1 style={{fontSize:"28px",fontWeight:"normal",marginBottom:"8px"}}>{T[topType].name}</h1>
          <p style={{color:typeLightColors[topType],fontSize:"16px",marginBottom:"48px"}}>{T[topType].alias}</p>
          <div style={{textAlign:"left",display:"flex",flexDirection:"column",gap:"24px",marginBottom:"48px"}}>
            {[["THE WOUND",T[topType].wound,true],["THE GIFT",T[topType].healthy,false],["THE INVITATION",T[topType].integration,false]].map(([lbl,val,italic])=>(
              <div key={lbl} style={{borderLeft:"2px solid "+typeColors[topType]+"88",paddingLeft:"18px"}}>
                <p style={{color:C.text,fontSize:"11px",letterSpacing:"0.12em",marginBottom:"8px"}}>{lbl}</p>
                <p style={{color:C.text,fontSize:"16px",lineHeight:"1.8",fontStyle:italic?"italic":"normal"}}>{italic?'"'+val+'"':val}</p>
              </div>
            ))}
            <div style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"2px solid #b8956a44",borderRadius:"10px",padding:"20px"}}>
              <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>RICHARD ROHR</p>
              <p style={{color:C.muted,lineHeight:"1.85",fontStyle:"italic",fontSize:"15px"}}>{T[topType].rohr}</p>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <button onClick={()=>setResultStage(1)} style={{backgroundColor:C.accent,color:C.bg,border:"none",padding:"15px",borderRadius:"8px",cursor:"pointer",fontSize:"16px",fontFamily:"inherit"}}>See Full Results</button>
            <button onClick={()=>openProfile(topType)} style={{backgroundColor:"transparent",color:C.text,border:"1px solid "+C.border,padding:"15px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>Read Full Profile</button>
          </div>
        </div></FadeIn>
        </div>
      </div>
    );

    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <div style={{display:"flex",gap:"10px",marginBottom:"28px",paddingTop:"8px"}}>
          <button onClick={()=>setResultStage(0)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:"14px",fontFamily:"inherit"}}>Back</button>
          <button onClick={()=>{setChecked({});setQuizPage(0);setResult(null);setQuizPhase(1);setPhase2Stmts([]);setView("quiz-intro");}} style={{background:"none",border:"1px solid "+C.border,color:C.muted,cursor:"pointer",fontSize:"13px",borderRadius:"4px",padding:"3px 10px",fontFamily:"inherit"}}>Retake</button>
        </div>
        <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"6px"}}>ALL SCORES</p>
        <h2 style={{fontSize:"22px",fontWeight:"normal",marginBottom:"32px"}}>How you scored across all nine types</h2>
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"28px"}}>
          {result.map(([t,score],i)=>{
            const tn=parseInt(t),pct=Math.round((score/maxScore)*100),isTied=hasTie&&tiedTypes.includes(tn);
            return(
              <div key={t} style={{backgroundColor:i===0?typeColors[tn]+"22":C.card,border:"1px solid "+(isTied?typeLightColors[tn]+"55":C.border),borderRadius:"8px",padding:"13px 15px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
                    <TypeBubble t={tn}/>
                    <span style={{color:isTied?C.text:C.muted,fontSize:"15px"}}>{T[tn].name}</span>
                    {i===0&&<span style={{color:C.accent,fontSize:"11px",letterSpacing:"0.08em"}}>TOP</span>}
                    {hasTie&&isTied&&i>0&&<span style={{color:"#9a9aca",fontSize:"11px",letterSpacing:"0.08em"}}>CLOSE</span>}
                  </div>
                  <span style={{color:typeLightColors[tn],fontSize:"14px"}}>{score%1===0?score:score.toFixed(1)}/{maxScore}</span>
                </div>
                <AnimBar pct={pct} color={typeLightColors[tn]+"99"} delay={i*60}/>
              </div>
            );
          })}
        </div>
        {hasTie&&mPairs.length>0&&(
          <div style={{backgroundColor:"#4a4a6a22",border:"1px solid #6a6a9a55",borderRadius:"10px",padding:"18px",marginBottom:"20px"}}>
            <p style={{color:"#9a9aca",fontSize:"12px",letterSpacing:"0.1em",marginBottom:"8px"}}>CLOSE RESULTS DETECTED</p>
            <p style={{color:C.muted,lineHeight:"1.7",marginBottom:"14px",fontSize:"14px"}}>Your top scores are close. Explore the distinctions on the type profile pages.</p>
            {mPairs.map(({k,a,b})=>(
              <button key={k} onClick={()=>openProfile(a)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",textAlign:"left",backgroundColor:C.card,border:"1px solid "+C.border,borderRadius:"8px",padding:"12px 14px",cursor:"pointer",marginBottom:"8px",fontFamily:"inherit"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}><TypeBubble t={a}/><TypeBubble t={b}/><span style={{color:C.muted,fontSize:"14px"}}>{mistypings[k].title}</span></div>
                <span style={{color:C.muted}}>-&gt;</span>
              </button>
            ))}
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          <button onClick={()=>openProfile(topType)} style={{backgroundColor:C.accent,color:C.bg,border:"none",padding:"15px",borderRadius:"8px",cursor:"pointer",fontSize:"16px",fontFamily:"inherit"}}>Read Full Profile</button>
          <button onClick={()=>{setMediaTab("bytype");setMediaTypeFilter(topType);setView("media");}} style={{backgroundColor:"transparent",color:C.muted,border:"1px solid "+C.border,padding:"15px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>Resources for Type {topType}</button>
          <button onClick={()=>setView("map")} style={{backgroundColor:"transparent",color:C.muted,border:"1px solid "+C.border,padding:"15px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>Explore the Map</button>
        </div>
      </div></FadeIn></div>
    );
  }

  // MAP
  if(view==="map") return (
    <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
      <h2 style={{fontSize:"21px",fontWeight:"normal",marginBottom:"6px"}}>The Enneagram</h2>
      <p style={{color:C.muted,fontSize:"14px",marginBottom:"16px"}}>Hover to see connections. Click a type to open its full profile.</p>
      <div style={{display:"flex",justifyContent:"center",marginBottom:"24px"}}>
        <EnneagramSVG size={320} onTypeClick={t=>openProfile(t)} interactive={true}/>
      </div>

      {/* Nine types grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"24px"}}>
        {[1,2,3,4,5,6,7,8,9].map(t=>(
          <button key={t} onClick={()=>openProfile(t)} style={{backgroundColor:typeColors[t]+"22",border:"1px solid "+typeColors[t]+"44",color:typeLightColors[t],borderRadius:"6px",padding:"10px 6px",cursor:"pointer",fontSize:"13px",fontFamily:"inherit",textAlign:"left"}}>
            <strong>{t}.</strong> {T[t].name.replace("The ","")}
          </button>
        ))}
      </div>

      {/* Explore the system */}
      <div style={{borderTop:"1px solid "+C.border,paddingTop:"20px",marginBottom:"8px"}}>
        <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"12px"}}>EXPLORE THE SYSTEM</p>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {[
            {label:"The Three Centers (Triads)",sub:"Gut, Heart, and Head",v:"triads",color:C.accent},
            {label:"The 27 Subtypes",sub:"SP, SO, and SX across all nine types",v:"subtypes",color:"#9a9aca"},
            {label:"Type Relationships",sub:"All 36 pairings",v:"relations",color:"#6a9aba"},
            {label:"Common Mistypings",sub:"14 pairs that are easy to confuse",v:"mistype-nav",color:"#aa8a6a"},
          ].map(({label,sub,v,color})=>(
            <button key={v} onClick={()=>setView(v)}
              style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"3px solid "+color+"66",borderRadius:"8px",padding:"13px 16px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border-color 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderLeftColor=color}
              onMouseLeave={e=>e.currentTarget.style.borderLeftColor=color+"66"}>
              <div>
                <p style={{color:C.text,fontSize:"15px",marginBottom:"2px"}}>{label}</p>
                <p style={{color:C.muted,fontSize:"12px"}}>{sub}</p>
              </div>
              <span style={{color:C.muted,fontSize:"16px",marginLeft:"12px"}}>-&gt;</span>
            </button>
          ))}
        </div>
      </div>
    </div></FadeIn><BottomNav/></div>
  );

  // PROFILE -- the hub
  if(view==="profile") {
    const t = selectedType ? T[selectedType] : null;
    // tab order: what you are -> how you're shaped -> how you connect to the system -> how you grow
    const tabs = ["overview","levels","wings","lines","triads","subtypes","relations","mistypings","voices","growth"];
    const tabLabels = {
      overview:"Overview", levels:"Levels", wings:"Wings", lines:"Lines",
      triads:"Triad", subtypes:"Subtypes", relations:"Relations",
      mistypings:"Mistypings", voices:"Voices", growth:"Growth"
    };
    const profileBg = t ? centerBg[t.center] : "transparent";

    // Derived data for embedded tabs
    const typeTriad = t ? Object.entries(triadData).find(([,td])=>td.types.includes(selectedType)) : null;
    const triadKey = typeTriad ? typeTriad[0] : null;
    const triadInfo = triadKey ? triadData[triadKey] : null;

    const typeSubs = selectedType ? SD.subs[selectedType] : null;

    // All 8 pairings for this type
    const typeRelPairs = selectedType ? [1,2,3,4,5,6,7,8,9].filter(n=>n!==selectedType).map(other=>{
      const lo=Math.min(selectedType,other),hi=Math.max(selectedType,other);
      const k=lo+"-"+hi;
      return {other, key:k, rel:allRelationships[k]};
    }).filter(({rel})=>rel) : [];

    // Same-type pairing
    const stp = selectedType ? sameTypePairings[selectedType] : null;

    // Mistypings for this type
    const typeMistypePairs = selectedType ? [[1,2],[1,6],[1,8],[2,3],[2,8],[2,9],[3,4],[3,7],[3,8],[4,5],[4,9],[5,6],[6,9],[7,9]]
      .filter(([a,b])=>a===selectedType||b===selectedType)
      .map(([a,b])=>({k:a+"-"+b,other:a===selectedType?b:a}))
      .filter(({k})=>mistypings[k]) : [];

    return (
      <div style={{...s,backgroundColor:C.bg}}>
        <NavBar/>
        <div style={{background:"linear-gradient(180deg,"+profileBg+" 0%,transparent 280px)"}}>
        <FadeIn><div style={{...maxW,...pad}}>
          <BackBtn to="map" label="The Map"/>
          {/* Type selector header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexWrap:"wrap",gap:"10px"}}>
            <div>
              <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.12em"}}>TYPE {selectedType}</p>
              <h2 style={{fontSize:"24px",fontWeight:"normal",marginBottom:"4px"}}>{t?t.name:""}</h2>
              <p style={{color:t?typeLightColors[selectedType]:C.muted,fontSize:"14px"}}>{t?t.alias+" \u00b7 "+t.center.charAt(0).toUpperCase()+t.center.slice(1)+" Center":""}</p>
            </div>
            <div style={{display:"flex",gap:"4px",flexWrap:"wrap",justifyContent:"flex-end"}}>
              {[1,2,3,4,5,6,7,8,9].map(n=>(
                <button key={n} onClick={()=>openProfile(n)} style={{backgroundColor:selectedType===n?typeColors[n]+"44":"transparent",border:"1px solid "+(selectedType===n?typeLightColors[n]:C.border),color:selectedType===n?typeLightColors[n]:C.muted,width:"28px",height:"28px",borderRadius:"50%",cursor:"pointer",fontSize:"12px",fontFamily:"inherit"}}>{n}</button>
              ))}
            </div>
          </div>

          {!t?<p style={{color:C.muted}}>Select a type.</p>:(
            <>
              {/* Tab dropdown */}
              <div style={{position:"relative",marginBottom:"24px"}}>
                <select
                  value={profileTab}
                  onChange={e=>setProfileTab(e.target.value)}
                  style={{
                    width:"100%",
                    backgroundColor:C.card,
                    border:"1px solid "+typeLightColors[selectedType]+"66",
                    borderRadius:"8px",
                    color:typeLightColors[selectedType],
                    fontSize:"14px",
                    fontFamily:"Palatino,'Palatino Linotype','Book Antiqua',Georgia,serif",
                    padding:"12px 40px 12px 16px",
                    cursor:"pointer",
                    appearance:"none",
                    WebkitAppearance:"none",
                    outline:"none",
                  }}
                >
                  {tabs.map(tab=>(
                    <option key={tab} value={tab} style={{backgroundColor:C.surface,color:C.text}}>
                      {tabLabels[tab]}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <div style={{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:typeLightColors[selectedType],fontSize:"11px"}}>v</div>
              </div>

              {/* OVERVIEW */}
              {profileTab==="overview"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  {[["Core Desire",t.core_desire],["Core Fear",t.core_fear],["The Wound",t.wound],["Passion (Vice)",t.passion],["Virtue",t.virtue]].map(([lbl,val])=>(
                    <Card key={lbl}>
                      <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{lbl.toUpperCase()}</p>
                      <p style={{color:C.text,lineHeight:"1.75",fontStyle:lbl==="The Wound"?"italic":"normal",fontSize:"16px"}}>{val}</p>
                    </Card>
                  ))}
                </div>
              )}

              {/* LEVELS */}
              {profileTab==="levels"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  {[["Healthy",t.healthy,"#4a7a4a"],["Average",t.average,C.accent],["Unhealthy",t.unhealthy,"#7a3a3a"]].map(([lbl,val,clr])=>(
                    <div key={lbl} style={{backgroundColor:C.card,border:"1px solid "+clr+"44",borderLeft:"3px solid "+clr,borderRadius:"8px",padding:"18px"}}>
                      <p style={{color:clr,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{lbl.toUpperCase()}</p>
                      <p style={{color:C.text,lineHeight:"1.75",fontSize:"15px"}}>{val}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* WINGS */}
              {profileTab==="wings"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                  <p style={{color:C.muted,lineHeight:"1.75",fontSize:"15px"}}>Most people lean toward one of their two adjacent wings, which flavors their core type. Same wound, different texture.</p>
                  {t.wings.map(w=>{
                    const wKey="w"+w;
                    const wd=wingData[selectedType]&&wingData[selectedType][wKey];
                    if(!wd) return null;
                    return(
                      <div key={w} style={{backgroundColor:C.card,border:"1px solid "+typeLightColors[w]+"44",borderLeft:"3px solid "+typeLightColors[w],borderRadius:"10px",overflow:"hidden"}}>
                        <div style={{padding:"16px 18px",borderBottom:"1px solid "+C.border}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                              <TypeBubble t={selectedType} size={24}/>
                              <span style={{color:C.muted,fontSize:"13px"}}>w</span>
                              <TypeBubble t={w} size={24}/>
                              <div>
                                <p style={{color:typeLightColors[w],fontSize:"15px"}}>{selectedType}w{w}</p>
                                <p style={{color:C.muted,fontSize:"12px"}}>{wd.name}</p>
                              </div>
                            </div>
                            <button onClick={()=>openProfile(w)} style={{background:"none",border:"1px solid "+C.border,color:C.muted,borderRadius:"4px",padding:"4px 10px",cursor:"pointer",fontSize:"11px",fontFamily:"inherit"}}>View Type {w}</button>
                          </div>
                        </div>
                        <div style={{padding:"16px 18px"}}>
                          <p style={{color:C.text,lineHeight:"1.85",fontSize:"14px",marginBottom:"14px"}}>{wd.desc}</p>
                          <div style={{backgroundColor:C.surface,borderRadius:"6px",padding:"12px 14px"}}>
                            <p style={{color:C.muted,lineHeight:"1.8",fontStyle:"italic",fontSize:"13px"}}>{wd.voice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* LINES */}
              {profileTab==="lines"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  {[["SECURITY (INTEGRATION)","#4a7a4a","#6aaa6a",t.security,t.integration],["STRESS (DISINTEGRATION)","#7a3a3a","#aa6a6a",t.stress,t.disintegration]].map(([lbl,border,color,num,text])=>(
                    <div key={lbl} style={{backgroundColor:C.card,border:"1px solid "+border+"44",borderLeft:"3px solid "+border,borderRadius:"8px",padding:"18px"}}>
                      <p style={{color:color,fontSize:"11px",letterSpacing:"0.08em",marginBottom:"6px"}}>{lbl+" -> TYPE "+num}</p>
                      <p style={{color:typeLightColors[num],marginBottom:"8px",fontSize:"14px"}}>{T[num].name}</p>
                      <p style={{color:C.text,lineHeight:"1.75",fontSize:"15px"}}>{text}</p>
                      <button onClick={()=>openProfile(num)} style={{marginTop:"12px",background:"none",border:"1px solid "+C.border,color:C.muted,borderRadius:"4px",padding:"4px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"inherit"}}>Explore Type {num}</button>
                    </div>
                  ))}
                </div>
              )}

              {/* TRIADS */}
              {profileTab==="triads"&&triadInfo&&(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  {/* Center summary */}
                  <div style={{backgroundColor:triadInfo.bg+"22",border:"1px solid "+triadInfo.bg+"44",borderRadius:"10px",padding:"18px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px",flexWrap:"wrap"}}>
                      <div style={{width:"10px",height:"10px",borderRadius:"50%",backgroundColor:triadInfo.color,flexShrink:0}}/>
                      <span style={{color:triadInfo.color,fontSize:"14px"}}>{triadInfo.label}</span>
                      <div style={{display:"flex",gap:"5px",marginLeft:"auto"}}>
                        {triadInfo.types.map(tn=>(
                          <button key={tn} onClick={()=>openProfile(tn)} style={{backgroundColor:typeColors[tn]+(tn===selectedType?"55":"33"),border:"1px solid "+typeLightColors[tn]+(tn===selectedType?"":"44"),color:typeLightColors[tn],borderRadius:"50%",width:"26px",height:"26px",cursor:"pointer",fontSize:"11px",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:tn===selectedType?"bold":"normal"}}>{tn}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"12px"}}>
                      {[["Core Emotion",triadInfo.coreEmotion],["Time",triadInfo.timeOrientation]].map(([lbl,val])=>(
                        <div key={lbl} style={{backgroundColor:C.bg+"88",borderRadius:"6px",padding:"6px 12px"}}>
                          <p style={{color:C.muted,fontSize:"10px",letterSpacing:"0.1em",marginBottom:"2px"}}>{lbl.toUpperCase()}</p>
                          <p style={{color:triadInfo.color,fontSize:"14px"}}>{val}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{color:C.text,lineHeight:"1.85",fontSize:"14px"}}>{triadInfo.coreWound}</p>
                  </div>
                  {/* This type's expression */}
                  <Card>
                    <p style={{color:typeLightColors[selectedType],fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>TYPE {selectedType} IN THE {triadKey.toUpperCase()} CENTER</p>
                    <p style={{color:C.text,lineHeight:"1.85",fontSize:"15px"}}>{triadInfo.typeNotes[selectedType]}</p>
                  </Card>
                  <Card>
                    <p style={{color:"#6aaa6a",fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>THE PATH FOR {triadKey.toUpperCase()} TYPES</p>
                    <p style={{color:C.text,lineHeight:"1.8",fontSize:"15px"}}>{triadInfo.integration}</p>
                  </Card>
                  {/* Scholar voices on this triad */}
                  {[["Richard Rohr",triadInfo.rohr,"#b8956a44"],["Suzanne Stabile",triadInfo.stabile,"#9a9aca44"],["Riso and Hudson",triadInfo.riso,"#8a9a5a44"]].map(([name,quote,bl])=>(
                    <div key={name} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"2px solid "+bl,borderRadius:"10px",padding:"18px 20px"}}>
                      <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{name.toUpperCase()}</p>
                      <p style={{color:C.muted,lineHeight:"1.85",fontStyle:"italic",fontSize:"14px"}}>{quote}</p>
                    </div>
                  ))}
                  {/* Other types in the triad */}
                  <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.1em",marginTop:"4px"}}>OTHER TYPES IN THIS CENTER</p>
                  {triadInfo.types.filter(tn=>tn!==selectedType).map(tn=>(
                    <div key={tn} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"3px solid "+typeLightColors[tn],borderRadius:"8px",padding:"14px 16px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px",justifyContent:"space-between"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                          <TypeBubble t={tn} size={22}/>
                          <span style={{color:typeLightColors[tn],fontSize:"14px"}}>{T[tn].name}</span>
                        </div>
                        <button onClick={()=>openProfile(tn)} style={{background:"none",border:"1px solid "+C.border,color:C.muted,borderRadius:"4px",padding:"4px 8px",cursor:"pointer",fontSize:"11px",fontFamily:"inherit"}}>View</button>
                      </div>
                      <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.7"}}>{triadInfo.typeNotes[tn]}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* SUBTYPES */}
              {profileTab==="subtypes"&&typeSubs&&(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  <p style={{color:C.muted,lineHeight:"1.75",fontSize:"15px",marginBottom:"4px"}}>The same core type, filtered through three instinctual drives, produces three distinct characters. Which one fits you?</p>
                  {Object.entries(SD.instincts).map(([instKey,inst])=>{
                    const sub = typeSubs[instKey];
                    const isCounter = SD.counterTypes[selectedType]===instKey;
                    const isOpen = profileSubInstinct===instKey;
                    return (
                      <button key={instKey} onClick={()=>setProfileSubInstinct(isOpen?null:instKey)}
                        style={{backgroundColor:isOpen?inst.color+"18":"transparent",border:"1px solid "+(isOpen?inst.color+"88":C.border),borderRadius:"10px",padding:"0",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s",overflow:"hidden"}}>
                        <div style={{padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                            <div style={{width:"8px",height:"8px",borderRadius:"50%",backgroundColor:inst.color,flexShrink:0}}/>
                            <div>
                              <span style={{color:isOpen?inst.color:C.text,fontSize:"14px"}}>{inst.label}</span>
                              <span style={{color:C.muted,fontSize:"12px",marginLeft:"8px"}}>{inst.short}</span>
                              {isCounter&&<span style={{color:"#9a9aca",fontSize:"11px",marginLeft:"8px",letterSpacing:"0.06em"}}>counter-type</span>}
                            </div>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                            {sub&&<span style={{color:inst.color,fontSize:"12px"}}>{sub.name}</span>}
                            <span style={{color:C.muted,fontSize:"12px"}}>{isOpen?"^":"v"}</span>
                          </div>
                        </div>
                        {isOpen&&sub&&(
                          <div style={{borderTop:"1px solid "+C.border,padding:"14px 16px"}}>
                            <p style={{color:C.text,lineHeight:"1.9",fontSize:"14px",marginBottom:isCounter?"12px":"0"}}>{sub.desc}</p>
                            {isCounter&&(
                              <div style={{backgroundColor:"#4a4a6a22",border:"1px solid #6a6a9a44",borderRadius:"6px",padding:"10px 12px",marginTop:"10px"}}>
                                <p style={{color:"#9a9aca",fontSize:"11px",letterSpacing:"0.08em",marginBottom:"4px"}}>COUNTER-TYPE</p>
                                <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.7"}}>This subtype looks least like a typical {T[selectedType].name.replace("The ","")}. Counter-types are often the hardest to correctly identify.</p>
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                  <div style={{backgroundColor:C.surface,borderRadius:"8px",padding:"14px 16px",marginTop:"4px"}}>
                    <p style={{color:C.muted,fontSize:"12px",letterSpacing:"0.1em",marginBottom:"6px"}}>BEATRICE CHESTNUT</p>
                    <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.75",fontStyle:"italic"}}>The subtypes are not optional additions to the basic type descriptions -- they are essential refinements without which the system loses much of its precision.</p>
                  </div>
                </div>
              )}

              {/* RELATIONS */}
              {profileTab==="relations"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  <p style={{color:C.muted,lineHeight:"1.75",fontSize:"15px",marginBottom:"4px"}}>How {t.name} tends to relate to each of the other eight types -- and to itself.</p>
                  {/* Same-type pairing first */}
                  {stp&&(()=>{
                    const isOpen = profileRelOther==="same";
                    return (
                      <button key="same" onClick={()=>setProfileRelOther(isOpen?null:"same")}
                        style={{backgroundColor:isOpen?typeColors[selectedType]+"33":"transparent",border:"1px solid "+(isOpen?typeLightColors[selectedType]+"66":C.border),borderRadius:"8px",padding:"0",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s",overflow:"hidden"}}>
                        <div style={{padding:"13px 15px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                            <TypeBubble t={selectedType} size={22}/>
                            <span style={{color:C.muted,fontSize:"12px"}}>+</span>
                            <TypeBubble t={selectedType} size={22}/>
                            <span style={{color:isOpen?typeLightColors[selectedType]:C.muted,fontSize:"14px"}}>Two {T[selectedType].name.replace("The ","")}s</span>
                          </div>
                          <span style={{color:C.muted,fontSize:"12px"}}>{isOpen?"^":"v"}</span>
                        </div>
                        {isOpen&&(
                          <div style={{borderTop:"1px solid "+C.border,padding:"14px 16px",display:"flex",flexDirection:"column",gap:"10px"}}>
                            {[["GIFTS",stp.gifts,"#6aaa6a"],["FRICTION",stp.friction,"#aa6a6a"],["GROWTH EDGE",stp.growth,C.accent]].map(([lbl,text,color])=>(
                              <div key={lbl} style={{borderLeft:"2px solid "+color+"66",paddingLeft:"12px"}}>
                                <p style={{color:color,fontSize:"11px",letterSpacing:"0.08em",marginBottom:"5px"}}>{lbl}</p>
                                <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.75"}}>{text}</p>
                              </div>
                            ))}
                            <p style={{color:C.muted,fontSize:"12px",lineHeight:"1.7",fontStyle:"italic",marginTop:"4px"}}>{stp.stabile}</p>
                          </div>
                        )}
                      </button>
                    );
                  })()}
                  {/* All 8 pairings */}
                  {typeRelPairs.map(({other,rel})=>{
                    const isOpen = profileRelOther===other;
                    return (
                      <button key={other} onClick={()=>setProfileRelOther(isOpen?null:other)}
                        style={{backgroundColor:isOpen?typeColors[other]+"22":"transparent",border:"1px solid "+(isOpen?typeLightColors[other]+"55":C.border),borderRadius:"8px",padding:"0",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s",overflow:"hidden"}}>
                        <div style={{padding:"13px 15px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                            <TypeBubble t={other} size={22}/>
                            <span style={{color:isOpen?typeLightColors[other]:C.muted,fontSize:"14px"}}>{T[other].name}</span>
                            {other===t.stress&&<span style={{color:"#aa6a6a",fontSize:"11px",letterSpacing:"0.06em"}}>stress</span>}
                            {other===t.security&&<span style={{color:"#6aaa6a",fontSize:"11px",letterSpacing:"0.06em"}}>security</span>}
                            {t.wings.includes(other)&&<span style={{color:typeLightColors[other],fontSize:"11px",letterSpacing:"0.06em"}}>wing</span>}
                          </div>
                          <span style={{color:C.muted,fontSize:"12px"}}>{isOpen?"^":"v"}</span>
                        </div>
                        {isOpen&&rel&&(
                          <div style={{borderTop:"1px solid "+C.border,padding:"14px 16px",display:"flex",flexDirection:"column",gap:"10px"}}>
                            <p style={{color:C.accent,fontSize:"12px",fontStyle:"italic"}}>{rel.title}</p>
                            {[["GIFTS",rel.gifts,"#6aaa6a"],["FRICTION",rel.friction,"#aa6a6a"],["GROWTH EDGE",rel.growth,C.accent]].map(([lbl,text,color])=>(
                              <div key={lbl} style={{borderLeft:"2px solid "+color+"66",paddingLeft:"12px"}}>
                                <p style={{color:color,fontSize:"11px",letterSpacing:"0.08em",marginBottom:"5px"}}>{lbl}</p>
                                <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.75"}}>{text}</p>
                              </div>
                            ))}
                            <p style={{color:C.muted,fontSize:"12px",lineHeight:"1.7",fontStyle:"italic",marginTop:"4px"}}>{rel.stabile}</p>
                            <button onClick={e=>{e.stopPropagation();openProfile(other);}} style={{background:"none",border:"1px solid "+C.border,color:C.muted,borderRadius:"4px",padding:"6px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"inherit",alignSelf:"flex-start"}}>View Type {other} Profile</button>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* MISTYPINGS */}
              {profileTab==="mistypings"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  <p style={{color:C.muted,lineHeight:"1.75",fontSize:"15px",marginBottom:"4px"}}>Types that share enough surface behavior with {t.name} to make identification difficult.</p>
                  {typeMistypePairs.length===0&&<p style={{color:C.muted,fontSize:"14px"}}>No documented mistypings for this type.</p>}
                  {typeMistypePairs.map(({k,other})=>{
                    const m = mistypings[k];
                    const isOpen = profileMistypeExpanded===k;
                    const parts = k.split("-");
                    const typeA = parseInt(parts[0]), typeB = parseInt(parts[1]);
                    return (
                      <button key={k} onClick={()=>setProfileMistypeExpanded(isOpen?null:k)}
                        style={{backgroundColor:isOpen?typeColors[other]+"22":"transparent",border:"1px solid "+(isOpen?typeLightColors[other]+"55":C.border),borderRadius:"8px",padding:"0",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s",overflow:"hidden"}}>
                        <div style={{padding:"13px 15px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                            <TypeBubble t={typeA} size={22}/>
                            <span style={{color:C.muted,fontSize:"12px"}}>vs</span>
                            <TypeBubble t={typeB} size={22}/>
                            <span style={{color:isOpen?C.text:C.muted,fontSize:"14px"}}>{m.title}</span>
                          </div>
                          <span style={{color:C.muted,fontSize:"12px"}}>{isOpen?"^":"v"}</span>
                        </div>
                        {isOpen&&(
                          <div style={{borderTop:"1px solid "+C.border,padding:"14px 16px",display:"flex",flexDirection:"column",gap:"10px"}}>
                            <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.75"}}>{m.summary}</p>
                            {m.distinctions.map((d,i)=>(
                              <div key={i} style={{backgroundColor:C.surface,borderRadius:"6px",overflow:"hidden"}}>
                                <div style={{backgroundColor:C.card,padding:"6px 12px",borderBottom:"1px solid "+C.border}}>
                                  <span style={{color:C.accent,fontSize:"11px",letterSpacing:"0.08em"}}>{d.label.toUpperCase()}</span>
                                </div>
                                <div style={{padding:"10px 12px",borderBottom:"1px solid "+C.border}}>
                                  <p style={{color:typeLightColors[typeA],fontSize:"10px",letterSpacing:"0.08em",marginBottom:"4px"}}>TYPE {typeA}</p>
                                  <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.65"}}>{d.one}</p>
                                </div>
                                <div style={{padding:"10px 12px"}}>
                                  <p style={{color:typeLightColors[typeB],fontSize:"10px",letterSpacing:"0.08em",marginBottom:"4px"}}>TYPE {typeB}</p>
                                  <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.65"}}>{d.two}</p>
                                </div>
                              </div>
                            ))}
                            <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.7",fontStyle:"italic",borderLeft:"2px solid #9a9aca44",paddingLeft:"10px"}}>{m.stabile}</p>
                            <button onClick={e=>{e.stopPropagation();openProfile(other);}} style={{background:"none",border:"1px solid "+C.border,color:C.muted,borderRadius:"4px",padding:"6px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"inherit",alignSelf:"flex-start"}}>View Type {other} Profile</button>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* VOICES */}
              {profileTab==="voices"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  {[{n:"Richard Rohr",q:t.rohr,bl:"#b8956a44"},{n:"Suzanne Stabile",q:t.stabile,bl:"#9a9aca44"},{n:"Ian Morgan Cron",q:t.cron,bl:"#6a9aba44"},{n:"Don Riso and Russ Hudson",q:t.riso,bl:"#8a9a5a44"}].map(v=>(
                    <div key={v.n} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"2px solid "+v.bl,borderRadius:"10px",padding:"20px"}}>
                      <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>{v.n.toUpperCase()}</p>
                      <p style={{color:C.text,lineHeight:"1.85",fontStyle:"italic",fontSize:"15px"}}>{v.q}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* GROWTH */}
              {profileTab==="growth"&&(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  <Card>
                    <p style={{color:"#6aaa6a",fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>THE PATH TOWARD WHOLENESS</p>
                    <p style={{color:C.text,lineHeight:"1.8",fontSize:"15px"}}>{t.integration}</p>
                  </Card>
                  <Card>
                    <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>THE INVITATION</p>
                    <p style={{color:C.text,lineHeight:"1.8",fontSize:"15px"}}>For {t.name}, the spiritual work is not to escape who you are, but to see clearly -- to hold your passion ({t.passion.split(" ")[0].toLowerCase()}) with compassion, and to grow toward your virtue: <strong style={{color:typeLightColors[selectedType]}}>{t.virtue}</strong>.</p>
                  </Card>
                  <Card>
                    <p style={{color:"#6aaa6a",fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>PRACTICAL INVITATIONS</p>
                    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                      {(growthPractices[selectedType]||[]).map((p,i)=>(
                        <div key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
                          <span style={{color:typeLightColors[selectedType],fontSize:"16px",marginTop:"1px",flexShrink:0}}>-</span>
                          <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.75"}}>{p}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <p style={{color:"#aa6a6a",fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>WARNING SIGNS</p>
                    <p style={{color:C.text,lineHeight:"1.8",fontSize:"15px"}}>{t.disintegration}</p>
                  </Card>
                </div>
              )}
            </>
          )}
        </div></FadeIn>
        </div>
        <BottomNav/>
      </div>
    );
  }

  // TRIADS (standalone)
  if(view==="triads") {
    const tr=triadData[activeTriad];
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <BackBtn to="map" label="The Map"/>
        <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"8px"}}>THE THREE CENTERS</p>
        <h2 style={{fontSize:"23px",fontWeight:"normal",marginBottom:"8px"}}>The Triads</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"28px",fontSize:"15px"}}>The nine types are grouped into three centers of intelligence -- gut, heart, and head. Understanding your center is as important as knowing your type.</p>
        <div style={{display:"flex",gap:"8px",marginBottom:"28px"}}>
          {Object.entries(triadData).map(([k,td])=>(
            <button key={k} onClick={()=>setActiveTriad(k)} style={{flex:1,padding:"10px 6px",borderRadius:"8px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px",border:"1px solid "+(activeTriad===k?td.color+"88":C.border),backgroundColor:activeTriad===k?td.bg+"33":"transparent",color:activeTriad===k?td.color:C.muted,transition:"all 0.2s"}}>{k.charAt(0).toUpperCase()+k.slice(1)}</button>
          ))}
        </div>
        <div style={{marginBottom:"20px",backgroundColor:tr.bg+"22",border:"1px solid "+tr.bg+"44",borderRadius:"12px",padding:"20px"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"16px",flexWrap:"wrap"}}>
            {tr.types.map(t=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:"8px",backgroundColor:typeColors[t]+"33",border:"1px solid "+typeLightColors[t]+"55",borderRadius:"6px",padding:"6px 12px"}}>
                <TypeBubble t={t} size={22}/>
                <span style={{color:typeLightColors[t],fontSize:"13px"}}>{T[t].name}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap",marginBottom:"16px"}}>
            {[["Core Emotion",tr.coreEmotion],["Time Orientation",tr.timeOrientation]].map(([lbl,val])=>(
              <div key={lbl} style={{backgroundColor:C.bg+"88",borderRadius:"6px",padding:"8px 14px"}}>
                <p style={{color:C.muted,fontSize:"10px",letterSpacing:"0.1em",marginBottom:"3px"}}>{lbl.toUpperCase()}</p>
                <p style={{color:tr.color,fontSize:"15px"}}>{val}</p>
              </div>
            ))}
          </div>
          <p style={{color:C.text,lineHeight:"1.85",fontSize:"15px"}}>{tr.coreWound}</p>
        </div>
        <Card style={{marginBottom:"12px"}}>
          <p style={{color:"#6aaa6a",fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>THE PATH OF INTEGRATION</p>
          <p style={{color:C.text,lineHeight:"1.8",fontSize:"15px"}}>{tr.integration}</p>
        </Card>
        <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"}}>
          <p style={{color:C.muted,fontSize:"12px",letterSpacing:"0.1em",marginBottom:"4px"}}>HOW EACH TYPE EXPRESSES THE CENTER</p>
          {tr.types.map(t=>(
            <div key={t} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"3px solid "+typeLightColors[t],borderRadius:"8px",padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <TypeBubble t={t} size={22}/>
                  <span style={{color:typeLightColors[t],fontSize:"14px"}}>{T[t].name}</span>
                </div>
                <button onClick={()=>openProfile(t)} style={{background:"none",border:"1px solid "+C.border,color:C.muted,borderRadius:"4px",padding:"4px 8px",cursor:"pointer",fontSize:"11px",fontFamily:"inherit"}}>View</button>
              </div>
              <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.7"}}>{tr.typeNotes[t]}</p>
            </div>
          ))}
        </div>
        {[["Richard Rohr",tr.rohr,"#b8956a44"],["Suzanne Stabile",tr.stabile,"#9a9aca44"],["Riso and Hudson",tr.riso,"#8a9a5a44"]].map(([name,quote,bl])=>(
          <div key={name} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"2px solid "+bl,borderRadius:"10px",padding:"18px 20px",marginBottom:"10px"}}>
            <p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{name.toUpperCase()}</p>
            <p style={{color:C.muted,lineHeight:"1.85",fontStyle:"italic",fontSize:"14px"}}>{quote}</p>
          </div>
        ))}
      </div></FadeIn><BottomNav/></div>
    );
  }

  // SUBTYPES (standalone)
  if(view==="subtypes") {
    const inst = subtypeInstinct ? SD.instincts[subtypeInstinct] : null;
    const sub = subtypeType && subtypeInstinct ? SD.subs[subtypeType][subtypeInstinct] : null;
    const isCounter = subtypeType && subtypeInstinct && SD.counterTypes[subtypeType]===subtypeInstinct;
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <BackBtn to="map" label="The Map"/>
        <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"8px"}}>BEATRICE CHESTNUT</p>
        <h2 style={{fontSize:"24px",fontWeight:"normal",marginBottom:"8px"}}>The 27 Subtypes</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"6px",fontSize:"15px"}}>The standard nine type descriptions fit most people only partially. The subtypes are where the system gets precise.</p>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"28px",fontSize:"14px"}}>Each type intersects with one of three instinctual drives -- self-preservation, social, or sexual/one-to-one -- producing 27 distinct characters.</p>
        <div style={{marginBottom:"24px"}}>
          <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>SELECT YOUR INSTINCT</p>
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {Object.entries(SD.instincts).map(([k,ins])=>(
              <button key={k} onClick={()=>setSubtypeInstinct(subtypeInstinct===k?null:k)}
                style={{backgroundColor:subtypeInstinct===k?ins.color+"22":"transparent",border:"1px solid "+(subtypeInstinct===k?ins.color+"88":C.border),borderRadius:"8px",padding:"14px 16px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:subtypeInstinct===k?"8px":"0"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                    <div style={{width:"8px",height:"8px",borderRadius:"50%",backgroundColor:ins.color}}/>
                    <span style={{color:subtypeInstinct===k?ins.color:C.text,fontSize:"15px"}}>{ins.label}</span>
                    <span style={{color:C.muted,fontSize:"12px"}}>{ins.short}</span>
                  </div>
                  <span style={{color:C.muted,fontSize:"13px"}}>{subtypeInstinct===k?"^":"v"}</span>
                </div>
                {subtypeInstinct===k&&<p style={{color:C.muted,fontSize:"13px",lineHeight:"1.75",paddingLeft:"18px"}}>{ins.desc}</p>}
              </button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:"24px"}}>
          <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"10px"}}>SELECT YOUR TYPE</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"6px"}}>
            {[1,2,3,4,5,6,7,8,9].map(n=>(
              <button key={n} onClick={()=>setSubtypeType(subtypeType===n?null:n)}
                style={{backgroundColor:subtypeType===n?typeColors[n]+"55":typeColors[n]+"22",border:"1px solid "+(subtypeType===n?typeLightColors[n]:typeColors[n]+"44"),color:subtypeType===n?typeLightColors[n]:C.muted,borderRadius:"6px",padding:"10px 4px",cursor:"pointer",fontSize:"12px",fontFamily:"inherit",transition:"all 0.15s"}}>
                {n}. {T[n].name.replace("The ","")}
              </button>
            ))}
          </div>
        </div>
        {sub && inst && subtypeType ? (
          <div>
            <div style={{backgroundColor:C.card,border:"1px solid "+inst.color+"44",borderLeft:"3px solid "+inst.color,borderRadius:"10px",padding:"20px",marginBottom:"16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px",flexWrap:"wrap"}}>
                <TypeBubble t={subtypeType} size={32}/>
                <div>
                  <p style={{color:typeLightColors[subtypeType],fontSize:"15px"}}>{T[subtypeType].name}</p>
                  <p style={{color:inst.color,fontSize:"13px"}}>{inst.label} subtype</p>
                </div>
                <div style={{marginLeft:"auto",backgroundColor:inst.color+"22",border:"1px solid "+inst.color+"55",borderRadius:"6px",padding:"6px 12px"}}>
                  <p style={{color:inst.color,fontSize:"14px"}}>{sub.name}</p>
                </div>
              </div>
              <p style={{color:C.text,lineHeight:"1.9",fontSize:"15px"}}>{sub.desc}</p>
            </div>
            {isCounter&&(
              <div style={{backgroundColor:"#4a4a6a22",border:"1px solid #6a6a9a55",borderRadius:"8px",padding:"14px 16px",marginBottom:"16px"}}>
                <p style={{color:"#9a9aca",fontSize:"11px",letterSpacing:"0.1em",marginBottom:"6px"}}>COUNTER-TYPE</p>
                <p style={{color:C.muted,fontSize:"13px",lineHeight:"1.7"}}>This is the counter-type subtype for Type {subtypeType} -- the one that looks least like a typical {T[subtypeType].name.replace("The ","")}. Counter-types are often the most difficult to identify correctly.</p>
              </div>
            )}
            <button onClick={()=>openProfile(subtypeType)} style={{width:"100%",backgroundColor:typeColors[subtypeType]+"33",border:"1px solid "+typeLightColors[subtypeType]+"55",color:typeLightColors[subtypeType],padding:"13px",borderRadius:"8px",cursor:"pointer",fontSize:"14px",fontFamily:"inherit"}}>Read Full Type {subtypeType} Profile</button>
          </div>
        ):(
          <div style={{backgroundColor:C.surface,border:"1px solid "+C.border,borderRadius:"8px",padding:"16px"}}>
            <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.75"}}>Select both an instinct and a type above to explore your subtype.</p>
          </div>
        )}
      </div></FadeIn><BottomNav/></div>
    );
  }

  // RELATIONS (standalone)
  if(view==="relations") {
    const getRelKey=(a,b)=>{const[lo,hi]=[Math.min(a,b),Math.max(a,b)];return lo+"-"+hi;};
    const key=relType1&&relType2?getRelKey(relType1,relType2):null;
    const rel=key?allRelationships[key]:null;
    const isSame = relType1&&relType2&&relType1===relType2;
    const stp2 = isSame ? sameTypePairings[relType1] : null;
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <BackBtn to="map" label="The Map"/>
        <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.15em",marginBottom:"8px"}}>ALL 36 PAIRINGS</p>
        <h2 style={{fontSize:"24px",fontWeight:"normal",marginBottom:"8px"}}>Type Relationships</h2>
        <p style={{color:C.muted,marginBottom:"24px",lineHeight:"1.75",fontSize:"15px"}}>Every pairing has its own gifts, friction points, and growth edge. Select any two types to explore how they tend to interact.</p>
        <div style={{display:"flex",flexDirection:"column",gap:"20px",marginBottom:"24px"}}>
          {[{label:"First Type",val:relType1,set:setRelType1},{label:"Second Type",val:relType2,set:setRelType2}].map(({label,val,set})=>(
            <div key={label}>
              <p style={{color:C.muted,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{label.toUpperCase()}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"6px"}}>
                {[1,2,3,4,5,6,7,8,9].map(n=>(
                  <button key={n} onClick={()=>set(n)} style={{backgroundColor:val===n?typeColors[n]+"55":typeColors[n]+"22",border:"1px solid "+(val===n?typeLightColors[n]:typeColors[n]+"44"),color:val===n?typeLightColors[n]:C.muted,borderRadius:"6px",padding:"9px 4px",cursor:"pointer",fontSize:"12px",fontFamily:"inherit",transition:"all 0.15s"}}>{n}. {T[n].name.replace("The ","")}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {isSame&&stp2&&(
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <p style={{color:C.accent,fontSize:"13px",fontStyle:"italic",textAlign:"center"}}>Two {T[relType1].name.replace("The ","")}s</p>
            {[["THE GIFTS",stp2.gifts,"#6aaa6a"],["THE FRICTION",stp2.friction,"#aa6a6a"],["THE GROWTH EDGE",stp2.growth,C.accent]].map(([lbl,text,color])=>(
              <div key={lbl} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"3px solid "+color+"66",borderRadius:"8px",padding:"16px 18px"}}>
                <p style={{color:color,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{lbl}</p>
                <p style={{color:C.text,lineHeight:"1.8",fontSize:"15px"}}>{text}</p>
              </div>
            ))}
            <Card><p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>SUZANNE STABILE</p><p style={{color:C.muted,lineHeight:"1.85",fontStyle:"italic",fontSize:"15px"}}>{stp2.stabile}</p></Card>
          </div>
        )}
        {rel&&!isSame&&(
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
              {[relType1,relType2].map(t=>(
                <div key={t} style={{backgroundColor:typeColors[t]+"22",border:"1px solid "+typeColors[t]+"44",borderRadius:"8px",padding:"14px",textAlign:"center"}}>
                  <TypeBubble t={t} size={32}/>
                  <div style={{color:typeLightColors[t],fontSize:"14px",marginTop:"8px"}}>{T[t].name}</div>
                </div>
              ))}
            </div>
            <p style={{color:C.accent,fontSize:"13px",fontStyle:"italic",textAlign:"center"}}>{rel.title}</p>
            {[["THE GIFTS",rel.gifts,"#6aaa6a"],["THE FRICTION",rel.friction,"#aa6a6a"],["THE GROWTH EDGE",rel.growth,C.accent]].map(([lbl,text,color])=>(
              <div key={lbl} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderLeft:"3px solid "+color+"66",borderRadius:"8px",padding:"16px 18px"}}>
                <p style={{color:color,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{lbl}</p>
                <p style={{color:C.text,lineHeight:"1.8",fontSize:"15px"}}>{text}</p>
              </div>
            ))}
            {[["Richard Rohr",rel.rohr],["Suzanne Stabile",rel.stabile]].map(([name,quote])=>(
              <Card key={name}><p style={{color:C.accent,fontSize:"11px",letterSpacing:"0.1em",marginBottom:"8px"}}>{name.toUpperCase()}</p><p style={{color:C.muted,lineHeight:"1.85",fontStyle:"italic",fontSize:"15px"}}>{quote}</p></Card>
            ))}
          </div>
        )}
        {!relType1&&<p style={{color:C.muted,fontSize:"15px"}}>Select two types above to begin.</p>}
      </div></FadeIn><BottomNav/></div>
    );
  }

  // MISTYPING NAV (standalone)
  if(view==="mistype-nav") {
    const pairList=[[1,2],[1,6],[1,8],[2,3],[2,8],[2,9],[3,4],[3,7],[3,8],[4,5],[4,9],[5,6],[6,9],[7,9]];
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <BackBtn to="map" label="The Map"/>
        <p style={{color:"#9a9aca",fontSize:"12px",letterSpacing:"0.12em",marginBottom:"6px"}}>DISCERNMENT</p>
        <h2 style={{fontSize:"22px",fontWeight:"normal",marginBottom:"8px"}}>Common Mistypings</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"28px",fontSize:"15px"}}>Types that share enough surface behavior to make self-identification difficult.</p>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {pairList.map(([a,b])=>{
            const k=a+"-"+b,m=mistypings[k];if(!m)return null;
            return(
              <button key={k} onClick={()=>{setPrevView("mistype-nav");setView("mistype-"+k);}}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",backgroundColor:C.card,border:"1px solid "+C.border,borderRadius:"8px",padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",transition:"border-color 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent+"66"}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}
              >
                <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{display:"flex",gap:"5px"}}><TypeBubble t={a}/><TypeBubble t={b}/></div>
                  <span style={{color:C.text,fontSize:"15px",textAlign:"left"}}>{m.title}</span>
                </div>
                <span style={{color:C.muted,flexShrink:0}}>-&gt;</span>
              </button>
            );
          })}
        </div>
      </div></FadeIn></div>
    );
  }

  // MISTYPING DETAIL (standalone)
  if(view&&view.startsWith("mistype-")&&view!=="mistype-nav") {
    const key=view.replace("mistype-",""),m=mistypings[key];
    const parts=key.split("-"),a=parseInt(parts[0]),b=parseInt(parts[1]);
    if(!m) return <div style={s}><div style={{...maxW,...pad}}><BackBtn to={prevView}/></div></div>;
    return (
      <div style={s}><NavBar/><FadeIn><div style={{...maxW,...pad}}>
        <BackBtn to={prevView} label={prevView==="mistype-nav"?"All Mistypings":"Back"}/>
        <p style={{color:"#9a9aca",fontSize:"12px",letterSpacing:"0.12em",marginBottom:"6px"}}>DISCERNMENT</p>
        <h2 style={{fontSize:"22px",fontWeight:"normal",marginBottom:"12px"}}>{m.title}</h2>
        <p style={{color:C.muted,lineHeight:"1.8",marginBottom:"28px",fontSize:"15px"}}>{m.summary}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"16px"}}>
          {[a,b].map(t=>(
            <div key={t} style={{backgroundColor:typeColors[t]+"22",border:"1px solid "+typeColors[t]+"44",borderRadius:"8px",padding:"14px",textAlign:"center"}}>
              <TypeBubble t={t} size={32}/>
              <div style={{color:typeLightColors[t],fontSize:"14px",marginTop:"8px"}}>{T[t].name}</div>
              <div style={{color:C.muted,fontSize:"12px"}}>{T[t].alias}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"24px"}}>
          {m.distinctions.map((d,i)=>(
            <div key={i} style={{backgroundColor:C.card,border:"1px solid "+C.border,borderRadius:"8px",overflow:"hidden"}}>
              <div style={{backgroundColor:C.surface,padding:"8px 14px",borderBottom:"1px solid "+C.border}}>
                <span style={{color:C.accent,fontSize:"12px",letterSpacing:"0.08em"}}>{d.label.toUpperCase()}</span>
              </div>
              <div>
                <div style={{padding:"12px 14px",borderBottom:"1px solid "+C.border}}>
                  <div style={{color:typeLightColors[a],fontSize:"11px",letterSpacing:"0.08em",marginBottom:"5px"}}>TYPE {a}</div>
                  <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.7"}}>{d.one}</p>
                </div>
                <div style={{padding:"12px 14px"}}>
                  <div style={{color:typeLightColors[b],fontSize:"11px",letterSpacing:"0.08em",marginBottom:"5px"}}>TYPE {b}</div>
                  <p style={{color:C.muted,fontSize:"14px",lineHeight:"1.7"}}>{d.two}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {[["Richard Rohr",m.rohr],["Suzanne Stabile",m.stabile]].map(([name,quote])=>(
          <Card key={name} style={{marginBottom:"10px"}}>
            <p style={{color:C.accent,fontSize:"12px",letterSpacing:"0.12em",marginBottom:"10px"}}>{name.toUpperCase()}</p>
            <p style={{color:C.muted,lineHeight:"1.85",fontStyle:"italic",fontSize:"15px"}}>{quote}</p>
          </Card>
        ))}
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginTop:"20px"}}>
          {[a,b].map(t=>(
            <button key={t} onClick={()=>openProfile(t)} style={{backgroundColor:typeColors[t]+"22",border:"1px solid "+typeColors[t]+"55",color:typeLightColors[t],padding:"14px",borderRadius:"8px",cursor:"pointer",fontSize:"15px",fontFamily:"inherit"}}>Read Type {t} Profile</button>
          ))}
        </div>
      </div></FadeIn></div>
    );
  }


  return <div style={s}><NavBar/><div style={{...maxW,...pad,textAlign:"center",paddingTop:"60px"}}><button onClick={()=>setView("home")} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:"16px",fontFamily:"inherit"}}>Return Home</button></div></div>;
}
