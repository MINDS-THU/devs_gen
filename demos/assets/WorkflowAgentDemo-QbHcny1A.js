import{a as e,c as t,d as n,f as r,i,l as a,m as o,n as s,o as c,p as l,r as u,s as d,t as f,u as p}from"./index-B4tTgEBu.js";var m=r(`circle-x`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]]),h=o(l(),1);a(`general: |
        ### General Implementation Requirements
        1. Language and environment:
        - Target Language: Python 3.10+
        - Standard Libraries: argparse, sys, json, logging, collections, random, xdevs.

        2. Input interface:
        - Use argparse for all runtime parameters.
        - No stdin is required in this benchmark case.

        3. Output interface:
        - stdout must contain JSONL event records only.
        - Each record uses: {time, entity, event, payload}.
        - stderr can contain non-KPI diagnostics.

    scenario: |
        ### Scenario: Strategic Airfreight Logistics
        Objective:
        Simulate a cargo logistics system with continuous pallet generation, FIFO queueing, aircraft assignment, delivery, return, and maintenance.

        Entities:
        - Facility: generates pallets at fixed intervals with unique ID and absolute expiration_time.
        - Loading Queue: holds pallets and performs active expiration while pallets remain in queue.
        - Fleet Coordinator: assigns next FIFO pallet whenever queue has cargo and aircraft is idle.
        - Aircraft: cyclic states: idle -> load(0s) -> fly -> unload -> return -> maintenance -> idle.
        - Destination: records pallet_delivered events and latency.

        Rules:
        - Time unit: seconds.
        - Pallet deadline while queued: generation_time + pallet_expiration_time.
        - Load time is zero.
        - Capacity per aircraft trip is one pallet.
        - No preemption after departure.
        - Fair assignment uses FIFO.

    args_input_output: |
        Command line args:
        - --duration (float)
        - --num_aircraft (int)
        - --pallet_interval (float)
        - --pallet_expiration_time (float)
        - --flight_time (float)
        - --unload_time (float)
        - --return_time (float)
        - --maintenance_time (float)

        stdin:
        - Not required.

        stdout JSONL schema:
        {
          "time": <float>,
          "entity": <"facility"|"queue"|"coordinator"|"aircraft"|"destination">,
          "event": <str>,
          "payload": <dict>
        }

        Required event family includes:
        - facility: pallet_generated
        - queue: pallet_queued, pallet_expired
        - coordinator: assignment_created
        - aircraft: depart, return, maintenance_start, maintenance_end
        - destination: pallet_delivered`);var g=`You are covering a simplified ICU overnight. A patient with suspected sepsis has six hours until the next full team review, and you need to choose the best treatment plan to maximize the patient's condition at the end of that period.

Right now the patient has low blood pressure, a high infection burden, mild kidney stress, and low fluid overload risk. You may use three kinds of interventions during the first three hours: vasopressors, IV fluids, and antibiotics. Vasopressors raise blood pressure immediately; kidney stress worsening is more likely when vasopressor exposure is repeated. IV fluids do not help immediately, but they usually improve blood pressure starting one hour later and continue helping for about two hours (sometimes closer to three). Antibiotics do not reduce the infection right away; they usually begin lowering infection burden about two hours after they are given. If infection stays high while blood pressure is low, kidney stress gets worse over time. Repeated fluid use can also create fluid overload, which harms the patient later.

You are considering three plans:
- Plan 1: vasopressor at hour 0, vasopressor at hour 1, then wait
- Plan 2: antibiotic at hour 0, IV fluids at hour 1, then wait
- Plan 3: IV fluids at hour 0, vasopressor at hour 1, antibiotic at hour 2

At the end of hour 6, the patient is scored as follows: stable blood pressure is worth 40 points; infection burden contributes 30 points if low, 15 if medium, and 0 if high; kidney stress gives a penalty of 0 for mild, 15 for moderate, and 35 for severe; fluid overload gives an additional 10-point penalty.

Write a description of the patient-treatment dynamics that should be modeled, then decide which plan is best.`,_=`1) Final decision

Plan 2 is best: antibiotic at hour 0, IV fluids at hour 1, then wait.

2) Key reasoning steps

Patient-treatment dynamics to model:
- State variables over time:
  - Blood pressure: currently low; needs to be stable by hour 6 for +40.
  - Infection burden: currently high; antibiotics lower it only after about 2 hours.
  - Kidney stress: currently mild; worsens if low BP and high infection persist together, and repeated vasopressors also increase risk.
  - Fluid overload: currently low risk; repeated fluids can create a later 10-point penalty.
- Action effects:
  - Vasopressor:
    - Immediate BP improvement in the hour given.
    - Benefit is short-lived.
    - Repeated exposure raises chance kidney stress worsens.
  - IV fluids:
    - No immediate BP benefit.
    - Usually start helping about 1 hour later.
    - Benefit persists about 2 hours, sometimes nearly 3.
    - Repeated use risks later fluid overload.
  - Antibiotics:
    - No immediate effect.
    - Usually begin lowering infection about 2 hours after administration.
- Interaction effect:
  - If infection remains high while BP is low, kidney stress worsens over time.

Plan comparison:
- Plan 1: vasopressor at 0, vasopressor at 1, then wait
  - BP improves early, but likely not sustained to hour 6.
  - No antibiotic, so infection stays high.
  - High infection plus later low BP likely worsens kidney stress.
  - Repeated vasopressors add kidney risk.
  - Likely final profile: unstable BP, high infection, at least moderate kidney stress.
- Plan 3: IV fluids at 0, vasopressor at 1, antibiotic at 2
  - Fluids help starting around hour 1 and may last to hour 3, maybe 4.
  - Vasopressor helps at hour 1 only.
  - Antibiotic given at 2 likely starts helping around hour 4, so infection may improve by hour 6.
  - But there is an early window at hour 0 with low BP and high infection, and BP support may fade before hour 6.
  - Better than Plan 1 on infection, but less reliable than Plan 2 for avoiding kidney worsening and achieving later stability.
- Plan 2: antibiotic at 0, fluids at 1, then wait
  - Antibiotic starts reducing infection around hour 2, giving the longest infection-control window by hour 6.
  - Fluids at 1 start supporting BP around hour 2 and often continue through hours 3-4, sometimes near 5.
  - This reduces the duration of simultaneous low BP and high infection, limiting kidney injury progression.
  - Only one fluid dose, so overload penalty is unlikely.
  - Among the options, this gives the best balance of later BP support, lowest infection by hour 6, and less kidney harm.

Why Plan 2 wins under the scoring:
- Infection score is very important: early antibiotics make low or at least medium infection by hour 6 most plausible.
- Kidney penalty likely lowest in Plan 2 because it avoids repeated vasopressors and shortens the dangerous high-infection/low-BP overlap.
- BP at hour 6 is somewhat uncertain in all plans, but Plan 1 clearly lacks durable support and Plan 3 delays antibiotics too much.
- So expected total score is highest for Plan 2.

3) Fragile assumptions

- I assume “stable blood pressure at hour 6” depends mainly on whether prior fluid benefit can still be present near that time, even though the stated fluid duration is usually only about 2 hours and sometimes closer to 3. If interpreted strictly, none of the plans may reliably secure BP stability at hour 6.
- I assume antibiotics at hour 0 are early enough to lower infection burden by hour 6 more than antibiotics at hour 2.
- I assume kidney stress progression depends on cumulative time with both low BP and high infection, not just a single threshold event.
- I assume one fluid dose does not trigger the 10-point overload penalty.
- I assume repeated vasopressors in Plan 1 meaningfully increase kidney risk relative to the other plans.

4) Confidence (0-1)

0.69`,v=`1) final decision
Plan 3.

2) concise reasoning trace
- I executed plan_1, plan_2, and plan_3 as separate tool calls on the same model and compared final_score from each result event.
- Returned scores:
  - plan_1: -35
  - plan_2: -5
  - plan_3: 15
- Plan 3 is highest.

3) stdin payload used
- command_args: --simulate_time 6
- one-plan payload per call, e.g. for plan_3:
{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_3","action_timeline":{"0":["iv_fluids"],"1":["vasopressor"],"2":["antibiotic"]}}]}

4) evidence from tool calls
- plan_1 result: {"event":"result","plans":[{"plan_id":"plan_1","final_score":-35,"score_breakdown":{"blood_pressure_points":0,"infection_points":0,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_1"}
- plan_2 result: {"event":"result","plans":[{"plan_id":"plan_2","final_score":-5,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_2"}
- plan_3 result: {"event":"result","plans":[{"plan_id":"plan_3","final_score":15,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":15,"fluid_overload_penalty":0}}],"best_plan_id":"plan_3"}`,y=`root_model_name: icu_sepsis_treatment
requirements:
  general: |
    Build a reusable, action-driven DEVS simulation model for a simplified ICU sepsis treatment problem over a fixed 6-hour horizon. The model must represent one patient state evolving over time under exogenous treatment actions supplied entirely at runtime. Do not encode any candidate plans, named strategies, or plan-specific logic in the model. The same world model must be able to evaluate any valid action timeline using the same transition rules. The simulation must be deterministic: given the same stdin payload, it must always emit the same stdout trace and final result. If the implementation includes uncertainty wording from the narrative such as 'usually' or 'sometimes', resolve it into explicit deterministic rules and parameters documented in the model spec rather than random sampling. Time should be modeled in whole hours with a clear event order within each hour. The model should simulate at least hours 0 through 6 inclusive for tracing, with terminal scoring at the end of hour 6 after all effects due by that time have been applied. The DEVS design should separate concerns into reusable components such as action input handling, patient state evolution, delayed effect scheduling/application, scoring, and trace emission. All state transitions must be explainable from explicit rules. The generated code should be executable from stdin/stdout without requiring interactive input.
  scenario: |
    Model a single ICU patient with the following initial qualitative state at hour 0: blood pressure is low, infection burden is high, kidney stress is mild, and fluid overload risk/status is low/absent. Available intervention types are vasopressor, iv_fluids, and antibiotic. Interventions may be scheduled only during hours 0, 1, and 2 by input actions, but the world model should not hardcode this restriction internally unless driven by scenario validation rules from stdin; the engine should still be generic enough to process any action_timeline within the horizon. Required patient-treatment dynamics: (1) Vasopressor effect: raises blood pressure immediately in the hour it is given. Repeated vasopressor exposure increases the chance/risk of kidney stress worsening; for deterministic modeling, define a concrete rule such as cumulative vasopressor exposures causing kidney stress escalation when exposure count reaches specified thresholds. (2) IV fluids effect: no immediate blood pressure benefit in the same hour they are given; blood pressure support begins one hour later and lasts about two hours, with the builder note implying longer support should be captured, so define a deterministic duration that is explicitly documented and consistent with the note about longer fluid support. Repeated fluid use should accumulate toward fluid overload, with a deterministic rule for when overload becomes present and when its penalty applies. (3) Antibiotic effect: no immediate infection reduction; infection burden begins improving two hours after administration. Define deterministic infection burden transitions over time, such as high to medium to low after explicit delays/exposures, while preserving delayed causality. (4) Ongoing harm interaction: if infection burden remains high while blood pressure is low, kidney stress worsens over time. Define the exact per-hour escalation rule and event ordering needed to determine when this interaction applies. (5) State representation should use discrete categories sufficient for scoring: blood pressure at least low vs stable, infection burden as high/medium/low, kidney stress as mild/moderate/severe, and fluid overload as absent/present. (6) End-of-horizon scoring at the end of hour 6: stable blood pressure = 40 points, otherwise 0; infection burden low = 30, medium = 15, high = 0; kidney stress penalty mild = 0, moderate = 15, severe = 35; fluid overload present = additional 10-point penalty, absent = 0. Final score = blood pressure points + infection points - kidney penalty - fluid overload penalty. The model should also report the final categorical state. The model must be suitable for evaluating any supplied action timeline, though the task narrative mentions three example plans. The checker can supply those plans externally through stdin and compare resulting final scores. The model description should make it possible for generated code to evaluate which externally supplied plan is best without embedding those plans into the simulation logic.
  args_input_output: |
    Input must be a single batch JSON object read from stdin. It must contain an action_timeline field encoding time-indexed actions for the full run. Recommended schema: {"horizon_hours": 6, "initial_state": {"blood_pressure": "low", "infection_burden": "high", "kidney_stress": "mild", "fluid_overload": false}, "action_timeline": [{"time": 0, "actions": ["vasopressor"]}, {"time": 1, "actions": ["vasopressor"]}], "model_params": {...optional deterministic override parameters...}}. Actions for a given hour may be an array of zero or more intervention names. If multiple actions occur in the same hour, define and document deterministic handling. The implementation may support either a single patient run or multiple runs in one payload, but at minimum it must support one complete action_timeline per invocation. Output must be JSONL on stdout: one JSON object per line. Emit structured trace events during execution, for example an initial event, per-hour events, delayed-effect application events, state update events, and a terminal result event. Each trace event should include at least an event type, simulation time, and enough state detail to reconstruct why the final score occurred. The final line must be a result event JSON object containing at least: event="result", horizon_hours, final_state, score_breakdown, total_score, and the normalized action_timeline used. No markdown or explanatory prose should be printed to stdout. Error handling should also use JSONL with a final error event if input is invalid. Determinism requirement: the same stdin payload, including any optional model_params, must always reproduce the identical output trace and final result. The event ordering within each hour must be explicitly defined, for example: apply newly scheduled immediate actions for that hour, apply delayed effects becoming active at that hour, update ongoing interaction harms, compute/post state snapshot. The exact ordering chosen must be documented and used consistently by both simulator and checker.
base_folder: examples/icu_sepsis_treatment
skip_simulation_check: false
only_ensure_executable: false`,b=`You are running a small biology lab for an 8-hour day (hour 0..8).

Each sample X, Y, Z must follow:
1) Preparation (1 hour, technician)
2) Incubation (2 hours, incubator)
3) Assay (1 hour, assay machine)

Base rules:
- One technician, one incubator, one assay machine (capacity 1 each)
- Different resources can run in parallel
- No preemption; strict stage order per sample
- At same hour boundary, stage completions are processed before new starts

Additional biosafety lockout (delayed):
- If an incubation starts at hour s, preparation is allowed at hour s
- Preparation is blocked only at hour s+1
- Blocked prep attempts are invalid and do not change state

Scoring:
- completed_by_8 = number of samples whose assay finishes by hour 8
- prep_bonus = +1 for each sample with preparation finished by hour 3
- composite_score = 10 * completed_by_8 + prep_bonus
- tie-breaker: fewer invalid actions

Strategies are evaluated as fixed scripts (no rescheduling inside a strategy):
- Strategy A: serial X then Y then Z
- Strategy B: prepare X/Y/Z first, then downstream stages
- Strategy C: pipelined script with overlap attempts at hours 1/2/3/5/7

Task: choose the best strategy among fixed scripts and explain why.`,x=`You are a careful planning assistant. Solve the task directly without external tools. Be explicit about assumptions and produce a concise but complete answer.`,S=`Return format:
1) Final decision
2) Key reasoning steps
3) Fragile assumptions
4) Confidence (0-1)`,C=`1) Final decision

Choose Strategy C.

2) Key reasoning steps

Workflow to model
- Each sample X, Y, Z must do:
  1. Preparation: 1 hour on the technician
  2. Incubation: 2 hours on the incubator
  3. Assay: 1 hour on the assay machine
- Order is strict: prep → incubation → assay.
- One technician, one incubator, one assay machine; capacity 1 each.
- Different resources may run in parallel.
- No preemption.
- Samples may wait between stages.
- At each integer hour:
  1. Finish any stages ending at that hour
  2. Then attempt that hour’s scripted starts
- Biosafety lockout rule:
  - If an incubation starts at hour s, preparation is still allowed at hour s.
  - Preparation is blocked at hour s+1, i.e. during the second hour of that incubation.
  - For a 2-hour incubation [s,s+2), prep is blocked only on [s+1,s+2).

Evaluate strategies

Strategy A
- 0–1 prep X
- 1–3 incubate X
- 3–4 assay X
- 4–5 prep Y
- 5–7 incubate Y
- 7–8 assay Y
- 8–9 prep Z
All valid.
Completed by 8:
- X finishes assay at 4
- Y finishes assay at 8
- Z not completed
=> completed_by_8 = 2

Prep finished by hour 3:
- X only
=> prep_bonus = 1

Composite = 10*2 + 1 = 21

Invalid actions: 0

Strategy B
- 0–1 prep X
- 1–2 prep Y
- 2–3 prep Z
- 3–5 incubate X
- 5–6 assay X and 5–7 incubate Y
- 7–8 assay Y and 7–9 incubate Z
All valid.
Completed by 8:
- X at 6
- Y at 8
- Z not by 8
=> completed_by_8 = 2

Prep finished by hour 3:
- X at 1, Y at 2, Z at 3
=> prep_bonus = 3

Composite = 10*2 + 3 = 23

Invalid actions: 0

Strategy C
- 0–1 prep X
- At hour 1, X prep completes, then start incubate X and start prep Y
  - This is valid because lockout is not immediate at incubation start.
- 1–2 prep Y, 1–3 incubate X
- Hour 2: attempt prep Z
  - Invalid, because X’s incubation has already run one full hour, so prep is blocked during 2–3.
- Hour 3: X incubation completes, then start assay X and incubate Y
- 3–4 assay X, 3–5 incubate Y
- Hour 5: start assay Y and incubate Z
- 5–6 assay Y, 5–7 incubate Z
- Hour 7: start assay Z
- 7–8 assay Z

Completed by 8:
- X at 4
- Y at 6
- Z at 8
=> completed_by_8 = 3

Prep finished by hour 3:
- X at 1, Y at 2, Z never prepared successfully
=> prep_bonus = 2

Composite = 10*3 + 2 = 32

Invalid actions: 1 (prep Z at hour 2), but no tie on composite, so irrelevant.

Best strategy
- A: 21
- B: 23
- C: 32

So Strategy C is best despite one invalid action, because it completes all three assays by hour 8 under the fixed script evaluation.

3) Fragile assumptions

- I interpret “fixed candidate script” to mean:
  - actions listed at a given hour are attempted exactly then,
  - invalid attempted actions simply fail,
  - later scripted actions are still attempted even if prerequisites were not successfully completed earlier.
- I assume the only extra biosafety restriction is on preparation, not on assay.
- I assume a failed preparation attempt for Z in Strategy C does not somehow prevent the later scripted incubate/assay starts from being evaluated; however, those later starts are treated as valid only if prerequisites are satisfied. Here the script only works if Z is considered prepared before incubation, so this is the one point to watch.
- If strict prerequisite enforcement is applied to every attempted start, then in Strategy C:
  - prep Z at hour 2 is invalid,
  - incubate Z at hour 5 would also be invalid because Z was never prepared,
  - assay Z at hour 7 would also be invalid,
  which would reduce C to only 2 completed samples. Under that stricter reading, Strategy B would win.
- Because the problem emphasizes the lockout timing as the “easy to miss” rule, I judged the intended comparison to focus on that rule, but prerequisite validity remains the main ambiguity.

4) Confidence (0-1)

0.63`,w=`1) final decision
Strategy B.

2) concise reasoning trace
- I used the executable model as the decision source and ran A/B/C as three separate episodes.
- Score summary from model outputs:
  - A: composite_score=21, completed_by_8=2, prep_bonus=1, invalid_action_count=0
  - B: composite_score=23, completed_by_8=2, prep_bonus=3, invalid_action_count=0
  - C: composite_score=22, completed_by_8=2, prep_bonus=2, invalid_action_count=3
- Ranking is B > C > A, so B is selected.

3) stdin payload used
Correct DEVS model usage method:
- Run one strategy per tool call (single episode each), not a mixed multi-strategy payload.
- Use payload keys:
  - episode_id: string
  - horizon: int
  - samples: ["X","Y","Z"]
  - action_timeline: [{"hour": int, "actions": [{"type":"start_stage","sample":"X|Y|Z","stage":"prepare|incubate|assay"}]}]
- Use command args: --simulate_time 9

Example (Strategy B):
{"episode_id":"B","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]}]}

4) evidence from tool calls
- Tool call A returned event="result" with composite_score=21 and overall_valid=true.
- Tool call B returned event="result" with composite_score=23 and overall_valid=true.
- Tool call C returned event="result" with composite_score=22 and invalid_action_count=3.
- Decision uses these executable results directly.`,T=`root_model_name: wet_lab_assay_scheduling
requirements:
  general: |-
    Build a reusable, deterministic, action-driven DEVS world model for one 8-hour wet-lab day.
    The model must evaluate externally supplied action timelines and must not hardcode strategy-choice logic.
    The same stdin payload must always produce the same stdout trace/final result.
  scenario: |-
    Samples: X, Y, Z.
    Stage order per sample: prepare (1h, technician) -> incubate (2h, incubator) -> assay (1h, assay_machine).
    Resource capacities: technician=1, incubator=1, assay_machine=1.
    No preemption. Stage prerequisites must hold.
    Completions at each integer hour are processed before starts at that hour.

    Additional biosafety lockout:
    - If incubation starts at hour s, preparation is allowed at hour s.
    - Preparation is blocked at hour s+1 only (lockout activates after one full hour of that incubation).
    - Blocked preparation attempts are invalid and do not change state.

    Strategy comparison in this scene is based on fixed candidate scripts supplied as action timelines.
  args_input_output: |-
    stdin: one JSON object in batch mode.
    Supported payload schemas:

    1) grouped timeline
    {
      "episode_id": "strategy_A",
      "horizon": 8,
      "samples": ["X","Y","Z"],
      "action_timeline": [
        {"hour": 0, "actions": [{"type":"start_stage","sample":"X","stage":"prepare"}]}
      ]
    }

    stdout: JSONL trace and final \`event="result"\` record.
  expected_io_behavior: |-
    The final result must include:
    - completed_samples_by_deadline (count of assay_end <= 8)
    - completed_sample_ids_by_deadline
    - prep_bonus (count of samples with preparation_end <= 3)
    - composite_score = 10 * completed_samples_by_deadline + prep_bonus
    - invalid_action_count
    - score_formula text

    Tie-breaking for strategy comparison:
    1) higher composite_score is better
    2) if tied, fewer invalid_action_count is better
base_folder: tasks/wet_lab_assay_scheduling`,E=`You are an agent for model-based task solving.
You must follow this exact workflow and keep it explicit in your trace:
1) Parse the task and extract state variables, actions, delays, constraints, and scoring rules.
2) Draft a full DEVS model spec directly in your own output (YAML text). Do NOT call any tool for spec writing.
3) Call construct_devs_model(spec_yaml=...) exactly once to compile the drafted spec into an executable DEVS project.
4) Read tool return fields carefully (entrypoint, CLI args/stdin schema, stdout contract, example run) and use them as the execution contract.
5) Before final decision, run multiple what-if experiments with run_devs_model.
   - For fixed-script comparison tasks, run at least three candidates (A/B/C or equivalent).
   - Keep inputs valid under the returned schema.
6) In reasoning, cite model outputs (scores, traces, violations) instead of relying only on narrative intuition.
7) Produce final answer with: chosen option, concise evidence chain, and major assumptions.`,D={wetlab:{commandArgs:`--simulate_time 9`,constructCall:`construct_devs_model(spec_yaml=<assistant_drafted_spec_yaml>)`,constructResult:`{"status":"ok","entrypoint_module":"devs_project.run_wet_lab_assay_scheduling","required_command_args":"--simulate_time 9","call_mode":"stdin_batch_json_one_episode_per_run","stdin_schema":{"episode_id":"string","horizon":"int","samples":"list[str]","action_timeline":"[{hour, actions:[{type:start_stage, sample, stage:prepare|incubate|assay}]}]"},"stdout_contract":"jsonl trace + final {event:"result"}","example_run":"python -m devs_project.run_wet_lab_assay_scheduling --simulate_time 9 < payload.json"}`,firstUserPrompt:`${b}\n\nAdditional instructions for model-spec generation:\n- Output one reusable DEVS world model spec (no hardcoded fixed winner).\n- Output keys must be: root_model_name, requirements{general,scenario,args_input_output}, base_folder, skip_simulation_check, only_ensure_executable.\n- Define stdin as one batch JSON payload with timeline actions.\n- Define stdout JSONL traces plus one final result event.\n- Determinism is required: same stdin must reproduce identical trace/result.`,reasoningBeforeRuns:`I have a valid invocation contract from construct_devs_model. I will run A/B/C as three separate episodes with --simulate_time 9, using stage values prepare|incubate|assay, then compare composite_score and invalid_action_count.`,runAInput:`run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"A","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"assay"}]},{"hour":4,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"}]},{"hour":8,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]}]}')`,runAResult:`{"event":"result","episode_id":"A","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":1,"prep_bonus_sample_ids":["X"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":21,"score":21,"invalid_action_count":0,"overall_valid":true,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"preparing"},"horizon":8}`,runBInput:`run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"B","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]}]}')`,runBResult:`{"event":"result","episode_id":"B","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":3,"prep_bonus_sample_ids":["X","Y","Z"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":23,"score":23,"invalid_action_count":0,"overall_valid":true,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"incubating"},"horizon":8}`,runCInput:`run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"C","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"},{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Z","stage":"assay"}]}]}')`,runCResult:`{"event":"result","episode_id":"C","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":2,"prep_bonus_sample_ids":["X","Y"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":22,"score":22,"invalid_action_count":3,"overall_valid":false,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"not_started"},"horizon":8}`,reasoningAfterRuns:`Executable comparison gives A=21, B=23, C=22.
B is best by primary metric (composite_score), and also has zero invalid actions.
C loses because lockout-driven invalid actions reduce effective completion quality.`},icu:{commandArgs:`--simulate_time 6`,constructCall:`construct_devs_model(spec_yaml=<assistant_drafted_spec_yaml>)`,constructResult:`{"status":"ok","entrypoint_module":"devs_project.run_icu_sepsis_treatment","required_command_args":"--simulate_time 6","call_mode":"stdin_batch_json_single_or_multi_plan","stdin_schema":{"horizon_hours":"int","initial_state":"dict","plans":"[{plan_id, action_timeline}]"},"stdout_contract":"jsonl trace + final {event:"result", plans:[...], best_plan_id}"}`,firstUserPrompt:`${g}\n\nAdditional instructions for model-spec generation:\n- Build one reusable action-driven DEVS world model (not plan-specific logic).\n- Output keys must be: root_model_name, requirements{general,scenario,args_input_output}, base_folder, skip_simulation_check, only_ensure_executable.\n- Define stdin as one batch payload containing initial state + candidate action timelines.\n- Define stdout as JSONL trace + final result event with score breakdown.\n- Resolve narrative uncertainty into explicit deterministic transition rules.`,reasoningBeforeRuns:`I will run the three candidate plans under the same constructed model and compare final_score plus score_breakdown from each result event.`,runAInput:`run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_1","action_timeline":{"0":["vasopressor"],"1":["vasopressor"]}}]}')`,runAResult:`{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_1","final_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"severe","fluid_overload":false},"final_score":-35,"score_breakdown":{"blood_pressure_points":0,"infection_points":0,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_1"}`,runBInput:`run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_2","action_timeline":{"0":["antibiotic"],"1":["iv_fluids"]}}]}')`,runBResult:`{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_2","final_state":{"blood_pressure":"low","infection_burden":"low","kidney_stress":"severe","fluid_overload":false},"final_score":-5,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_2"}`,runCInput:`run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_3","action_timeline":{"0":["iv_fluids"],"1":["vasopressor"],"2":["antibiotic"]}}]}')`,runCResult:`{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_3","final_state":{"blood_pressure":"low","infection_burden":"low","kidney_stress":"moderate","fluid_overload":false},"final_score":15,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":15,"fluid_overload_penalty":0}}],"best_plan_id":"plan_3"}`,reasoningAfterRuns:`Model outputs rank plan_3 (15) > plan_2 (-5) > plan_1 (-35).
plan_3 is the only one that reaches low infection with moderate kidney penalty under these deterministic delays.`}},O=e();function k({role:e,title:t,children:n}){let r={system:`border-cyan-200 bg-cyan-50`,user:`border-slate-300 bg-slate-50`,tool_calling:`border-emerald-200 bg-emerald-50`,reasoning:`border-indigo-200 bg-indigo-50`,reply:`border-amber-300 bg-amber-50`};if(e===`system`)return(0,O.jsxs)(`div`,{className:`rounded-xl border p-3 ${r[e]}`,children:[(0,O.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:t}),n]});let i=e===`user`?`justify-end`:`justify-start`,a=e===`user`?`max-w-[84%]`:`max-w-[98%]`;return(0,O.jsx)(`div`,{className:`flex ${i}`,children:(0,O.jsxs)(`div`,{className:`w-full ${a} rounded-xl border p-3 ${r[e]||`border-slate-200 bg-white`}`,children:[(0,O.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:t}),n]})})}function A({activeCase:e}){let r=D[e.id],a=e.id===`wetlab`?T:y,o=e.id===`wetlab`?C:_,l=e.id===`wetlab`?w:v,g=e.id===`wetlab`?`Wet-Lab`:`ICU`,b=(0,h.useMemo)(()=>`${e.inputText}\n\n${S}`,[e]),[A,j]=(0,h.useState)(()=>({[e.planTree.id]:!0})),[M,N]=(0,h.useState)(e.planTree.id),[P,F]=(0,h.useState)(e.codeGraph.nodes[0]?.id||``),I=(0,h.useMemo)(()=>d(e.planTree,M)??e.planTree,[e,M]),L=(0,h.useMemo)(()=>c(e.codeGraph.nodes,P)??e.codeGraph.nodes[0],[e,P]),R=(0,h.useMemo)(()=>`{"type":"tool_call","name":"construct_devs_model","arguments":{"spec_yaml":"<see spec block below>"}}`,[]);return r?(0,O.jsx)(`div`,{className:`space-y-4`,children:(0,O.jsxs)(`div`,{className:`grid gap-4 lg:grid-cols-[150px_minmax(0,1fr)]`,children:[(0,O.jsx)(`aside`,{className:`hidden lg:block`,children:(0,O.jsxs)(`div`,{className:`sticky top-4 rounded-xl border border-slate-200 bg-white p-3`,children:[(0,O.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`On this page`}),(0,O.jsxs)(`div`,{className:`space-y-1 text-xs`,children:[(0,O.jsx)(`a`,{href:`#wf-agent`,className:`block rounded px-2 py-1 text-emerald-700 hover:bg-slate-100`,children:`Model-assisted run`}),(0,O.jsx)(`a`,{href:`#wf-direct`,className:`block rounded px-2 py-1 text-rose-700 hover:bg-slate-100`,children:`Direct run`})]})]})}),(0,O.jsxs)(`div`,{className:`min-w-0 space-y-4`,children:[(0,O.jsx)(`div`,{id:`wf-agent`,className:`scroll-mt-24`,children:(0,O.jsx)(i,{icon:(0,O.jsx)(n,{className:`size-4`}),title:`Model-Assisted Run (${g})`,children:(0,O.jsxs)(`div`,{className:`space-y-3`,children:[(0,O.jsx)(k,{role:`system`,title:`system`,children:(0,O.jsx)(`pre`,{className:`max-h-40 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:E})}),(0,O.jsx)(k,{role:`user`,title:`user`,children:(0,O.jsx)(`pre`,{className:`max-h-56 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r.firstUserPrompt})}),(0,O.jsxs)(k,{role:`tool_calling`,title:`tool call`,children:[(0,O.jsxs)(`p`,{className:`mb-1 text-[11px] font-semibold text-slate-600`,children:[`Specification passed to `,(0,O.jsx)(`code`,{children:`construct_devs_model`})]}),(0,O.jsx)(`pre`,{className:`max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:R}),(0,O.jsx)(`pre`,{className:`mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:a}),(0,O.jsxs)(`div`,{className:`mt-2 rounded-xl border border-slate-200 bg-white p-3`,children:[(0,O.jsx)(`p`,{className:`mb-2 text-[11px] text-slate-700`,children:`The tool call runs DEVS-Gen's two-stage construction process.`}),(0,O.jsxs)(`div`,{className:`grid w-full gap-3`,children:[(0,O.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,O.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`Stage 1: Structural Planning (Top-Down)`}),(0,O.jsxs)(`div`,{className:`grid gap-3 lg:grid-cols-[0.95fr_1fr]`,children:[(0,O.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,O.jsx)(u,{node:e.planTree,depth:0,openTree:A,setOpenTree:j,selectedTreeNodeId:M,setSelectedTreeNodeId:N})}),(0,O.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:[(0,O.jsx)(`h3`,{className:`mb-1 text-sm font-semibold text-slate-800`,children:I.name}),(0,O.jsxs)(`p`,{className:`mb-2 text-xs text-slate-500`,children:[I.type,` · `,I.summary]}),(0,O.jsx)(s,{title:`init args`,items:I.initArgsTyped||p(I.initArgs)}),(0,O.jsx)(s,{title:`input ports`,items:I.portsTyped?.input||p(I.ports?.input||[])}),(0,O.jsx)(s,{title:`output ports`,items:I.portsTyped?.output||p(I.ports?.output||[])})]})]})]}),(0,O.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,O.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`Stage 2: Behavioral Synthesis (Bottom-Up)`}),(0,O.jsxs)(`div`,{className:`grid gap-3`,children:[(0,O.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,O.jsx)(f,{graphKey:`workflow-${e.id}`,graph:e.codeGraph,selectedCodeNodeId:P,setSelectedCodeNodeId:F,compact:!0},e.id)}),(0,O.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:[(0,O.jsx)(`h3`,{className:`mb-1 text-sm font-semibold text-slate-800`,children:L.label}),(0,O.jsxs)(`p`,{className:`mb-2 text-xs text-slate-500`,children:[`file: `,L.file]}),(0,O.jsx)(s,{title:`input ports`,items:L.portsTyped?.in||p(L.ports.in),compact:!0}),(0,O.jsx)(s,{title:`output ports`,items:L.portsTyped?.out||p(L.ports.out),compact:!0}),(0,O.jsx)(`div`,{className:`mt-2 space-y-2`,children:t(L).map(e=>(0,O.jsxs)(`details`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,O.jsxs)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:[e.name,` · `,e.paperName]}),(0,O.jsx)(`pre`,{className:`mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:String(e.code)})]},e.name))})]})]})]})]})]}),(0,O.jsxs)(`div`,{className:`mt-2 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,O.jsx)(`p`,{className:`mb-1 text-[11px] font-semibold text-slate-600`,children:`Tool result and execution contract`}),(0,O.jsx)(`pre`,{className:`max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r.constructResult})]})]}),(0,O.jsx)(k,{role:`reasoning`,title:`reasoning`,children:(0,O.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r.reasoningBeforeRuns})}),(0,O.jsxs)(k,{role:`tool_calling`,title:`tool call · candidate A`,children:[(0,O.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r.runAInput}),(0,O.jsx)(`pre`,{className:`mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:r.runAResult})]}),(0,O.jsxs)(k,{role:`tool_calling`,title:`tool call · candidate B`,children:[(0,O.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r.runBInput}),(0,O.jsx)(`pre`,{className:`mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:r.runBResult})]}),(0,O.jsxs)(k,{role:`tool_calling`,title:`tool call · candidate C`,children:[(0,O.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r.runCInput}),(0,O.jsx)(`pre`,{className:`mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:r.runCResult})]}),(0,O.jsx)(k,{role:`reasoning`,title:`reasoning`,children:(0,O.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r.reasoningAfterRuns})}),(0,O.jsx)(k,{role:`reply`,title:`reply`,children:(0,O.jsx)(`pre`,{className:`max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:l})})]})})}),(0,O.jsx)(`div`,{id:`wf-direct`,className:`scroll-mt-24`,children:(0,O.jsx)(i,{icon:(0,O.jsx)(m,{className:`size-4`}),title:`Direct Run`,children:(0,O.jsxs)(`div`,{className:`space-y-3`,children:[(0,O.jsxs)(`div`,{className:`rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]`,children:[(0,O.jsx)(`span`,{className:`font-mono text-slate-700`,children:`GPT-5.4`}),(0,O.jsx)(`span`,{className:`ml-2 text-slate-600`,children:`Only the final response is shown.`})]}),(0,O.jsx)(k,{role:`system`,title:`system`,children:(0,O.jsx)(`pre`,{className:`max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:x})}),(0,O.jsx)(k,{role:`user`,title:`user`,children:(0,O.jsx)(`pre`,{className:`max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:b})}),(0,O.jsx)(k,{role:`reply`,title:`reply`,children:(0,O.jsx)(`pre`,{className:`max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:o})})]})})})]})]})}):null}export{A as default};