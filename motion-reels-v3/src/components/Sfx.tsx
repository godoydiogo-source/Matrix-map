import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";

export type Cue = { at: number; name: string; vol?: number };

/** SFX curtos no ritmo dos cortes. `at` em frames absolutos da composição. */
export const Sfx: React.FC<{ cues: Cue[] }> = ({ cues }) => {
  return (
    <>
      {cues.map((c, i) => (
        <Sequence key={`${c.name}-${c.at}-${i}`} from={c.at} durationInFrames={30} name={`sfx ${c.name}`}>
          <Audio src={staticFile(`sfx/${c.name}.wav`)} volume={c.vol ?? 0.8} />
        </Sequence>
      ))}
    </>
  );
};
