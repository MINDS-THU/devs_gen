import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  CircleX,
  CheckCircle2,
  ChevronDown,
  FileJson2,
  GitBranch,
  Network,
  Route,
} from 'lucide-react'

const ABP_INPUT = `general: |
        ### General Implementation Requirements
        1. Language & Environment:
        - Target Language: Python 3.10+
        - Standard Libraries: \`argparse\`, \`sys\`, \`json\`, \`logging\`, \`collections\`, \`random\`, \`simpy\`, \`xdevs\`.

        2. Input Interface (Arguments & Stdin):
        - **CLI Arguments:** You MUST use the \`argparse\` library to handle configuration parameters.
        - **Data Stream:** If dynamic input is required, read from \`sys.stdin\` line-by-line.

        3. Output Interface:
        - Stream 1: KPI Data (sys.stdout)
            - You MUST print ONLY the required event records to Standard Output.
            - Format: JSONL. Each line is a valid, independent JSON object representing a key event.
            - Schema: Each JSON object MUST follow this structure:
            ---
            {
                "time": <float>,
                "entity": <str>,
                "event": <str>,
                "payload": <dict>
            }
            ---
            - Example: \`print(json.dumps({"time": 10.5, "entity": "sender", "event": "packet_sent", "payload": {"seq_num": 1, "bit": 0, "is_retry": false}}))\`, or use your customized logger.
        - Stream 2: Any other data (sys.stderr)
            - Print any other information to Standard Error.

        4. Time Format & Units:
        - Absolute Time: All time values in the output JSONL MUST be floats. The "time" field represents the absolute simulation time starting from \`0.0\`.
        - Precision: Keep at least 2 decimal places.

    scenario: |
        ### Scenario: Reliable Data Transfer with Deterministic Noise Interference
        1. System Objective: Design a communication system consisting of a Sender, a Receiver, and two uni-directional transmission channels (Subnets). The goal is to transmit a sequence of packets reliably using an Alternating Bit Protocol (ABP) despite deterministic packet loss in the channels.

        2. Entity Behaviors:
        The Sender:
            - Accepts a single control input at the start of simulation: the total number of packets to send.
            - Before sending each packet, the Sender must undergo a preparation delay (default 10ms, configurable via --sender_delay).
            - The Receiver must maintain a buffer with capacity 1. During the busy period, it must buffer the only received packet, and process the packet immediately after the busy processing delay. When multiple packets arrive, only the first one is stored.
            - Sends packets sequentially through Subnet1. Each packet contains a sequence number (1, 2, ...) and a control bit (alternating between 0 and 1). The first bit is 0.
            - After sending a packet, it starts a timer (default 20ms, configurable via --timeout).
            - Stop-and-Wait Logic: It must not send the next packet until it receives a correct Acknowledgment (ACK) for the current one.
            - Retransmission: If the timer expires before a valid ACK is received, the Sender retransmits the same packet and restarts the timer.
            - Validation: An ACK is valid only if its bit matches the control bit of the current packet.
            - After sending the specified total number of packets, the Sender stops automatically.

        The Receiver:
            - Upon receiving a packet, it undergoes a processing delay (default 10ms, configurable via --receiver_delay) before processing.
            - The Receiver must maintain a buffer with capacity 1. During the busy period, it must buffer the only received packet, and process the packet immediately after the busy processing delay. When multiple packets arrive, only the first one is stored.
            - After the processing delay, it extracts the control bit and immediately sends back an ACK packet containing that same bit through Subnet2.

        The Subnets (Channels):
            - There are two independent channels: Subnet1 (Sender -> Receiver) and Subnet2 (Receiver -> Sender).
            - Latency: Every packet takes exactly 3ms (configurable via --channel_delay) to traverse.
            - Deterministic Noise & Loss Model: Each subnet independently simulates interference using a deterministic formula.
                - Each Subnet maintains an internal "noise level" value x, initialized to exactly the seed value (provided via --seed).
                - Packet Fate Determination: When a packet arrives at a subnet, calculate a new noise level: x_new = (17 * x_old + 11) mod 100.
                - If x_new < 10, the interference is too high, and the packet is dropped (vanishes). Otherwise, it is transmitted normally after the channel delay.
                - After determination, update the noise level for the next packet: x_old = x_new.
                - Timing: The noise calculation and fate determination happen immediately when the packet arrives at the subnet.

        3. Scenario Constraints:
            - Time Unit Mapping: 1.0 simulation time unit = 1 Millisecond (ms).
            - System starts at time 0.0 with all components initialized to idle states.

    args_input_output: |
        1. Command Line Arguments:
        The script must accept the following named arguments:
        * \`--total_packets\` (int): The total number of packets the Sender intends to send in one session triggered by a START_BATCH command.
        * \`--seed\` (int): The initialization seed for the noise generator of both sides (the \`x\` value in the LCG formula). Default: 42.
        * \`--timeout\` (int): Sender's timeout duration in ms. Default: 20.
        * \`--sender_delay\` (int): Sender preparation delay in ms. Default: 10.
        * \`--receiver_delay\` (int): Receiver processing delay in ms. Default: 10.
        * \`--channel_delay\` (int): Subnet transmission delay in ms. Default: 3.
        * \`--simulate_time\` (int): The total simulation time to run in ms. Default: 1000.

        2. stdin Format:
        * No stdin input is required for this simulation. The system uses command line arguments for configuration.

        3. **Standard Output (stdout)**:
        * Format: JSONL, one independent JSON object per line
        * Each record MUST follow the format: \`{"time": <float>, "entity": <str>, "event": <str>, "payload": <dict>}\`
        * **Event Types and Formats**:
            Sender Events:
            - event: \`delay_start\` (Sender starts preparation delay)
            - time: Sender's current time
            - entity: "sender"
            - payload: \`{"type": "preparation", "duration": <float>}\`
            - Trigger: When Sender starts preparing a packet

            - event: \`packet_sent\` (Packet sent)
            - time: Sender's current time
            - entity: "sender"
            - payload: \`{"seq_num": <int>, "bit": <0|1>, "is_retry": <bool>}\`
            - Trigger: When Sender completes preparation delay and hands packet to subnet

            - event: \`ack_received\` (ACK received)
            - time: Sender's current time
            - entity: "sender"
            - payload: \`{"ack_bit": <0|1>, "is_valid": <bool>}\`
            - Trigger: When Sender receives an ACK

            Receiver Events:
            - event: \`delay_start\` (Receiver starts processing delay)
            - time: Receiver's current time
            - entity: "receiver"
            - payload: \`{"type": "processing", "duration": <float>}\`
            - Trigger: When Receiver starts processing a received packet

            - event: \`packet_received\` (Packet successfully received)
            - time: Receiver's current time
            - entity: "receiver"
            - payload: \`{"seq_num": <int>, "bit": <0|1>}\`
            - Trigger: When Receiver completes processing delay and successfully receives packet

            Subnet Events:
            - event: \`packet_get\` (Packet fate determined)
            - time: Subnet's current time
            - entity: "subnet"
            - payload: \`{"behavior": <"drop"|"pass">, "channel": <"forward"|"backward">, "noise_value": <int>}\`
            - Trigger: When packet arrives at subnet, before transmission delay starts
            - Note: "forward" for Sender->Receiver channel, "backward" for Receiver->Sender channel`

const ABP_INPUT_SECTIONS = splitAbpInputText(ABP_INPUT)

const ABP_METRIC_FORMULA = `v_i = I(ExitCode=0) * I(NoTimeout) * I(ValidSchema(T_i))
Score_ope = (1/N) * sum_i v_i

c_i = (1/2) * v_i * (
  sum_{r in R_micro} r(T_i) / |R_micro| +
  sum_{r in R_macro} r(T_i) / |R_macro|
)
Score_beh = (1/N) * sum_i c_i`

const SA_INPUT = `general: |
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
        - destination: pallet_delivered`

const SA_INPUT_SECTIONS = splitAbpInputText(SA_INPUT)

const SA_METRIC_FORMULA = `v_i = I(ExitCode=0) * I(NoTimeout) * I(ValidSchema(T_i))
Score_ope = (1/N) * sum_i v_i

c_i = (1/2) * v_i * (
  sum_{r in R_micro} r(T_i) / |R_micro| +
  sum_{r in R_macro} r(T_i) / |R_macro|
)
Score_beh = (1/N) * sum_i c_i`

const AI2_INPUT = `|
  "Some objects in the scene have been moved from their correct positions. Explore the environment, compare it with the goal state, identify which objects are misplaced, and rearrange them to match the goal configuration."

  The environment may include both object-placement differences and openable receptacle state differences.

  Please build an interactive environment model for this scenario.
  Keep it compact and readable.`

const ICU_INPUT = `You are covering a simplified ICU overnight. A patient with suspected sepsis has six hours until the next full team review, and you need to choose the best treatment plan to maximize the patient's condition at the end of that period.

Right now the patient has low blood pressure, a high infection burden, mild kidney stress, and low fluid overload risk. You may use three kinds of interventions during the first three hours: vasopressors, IV fluids, and antibiotics. Vasopressors raise blood pressure immediately; kidney stress worsening is more likely when vasopressor exposure is repeated. IV fluids do not help immediately, but they usually improve blood pressure starting one hour later and continue helping for about two hours (sometimes closer to three). Antibiotics do not reduce the infection right away; they usually begin lowering infection burden about two hours after they are given. If infection stays high while blood pressure is low, kidney stress gets worse over time. Repeated fluid use can also create fluid overload, which harms the patient later.

You are considering three plans:
- Plan 1: vasopressor at hour 0, vasopressor at hour 1, then wait
- Plan 2: antibiotic at hour 0, IV fluids at hour 1, then wait
- Plan 3: IV fluids at hour 0, vasopressor at hour 1, antibiotic at hour 2

At the end of hour 6, the patient is scored as follows: stable blood pressure is worth 40 points; infection burden contributes 30 points if low, 15 if medium, and 0 if high; kidney stress gives a penalty of 0 for mild, 15 for moderate, and 35 for severe; fluid overload gives an additional 10-point penalty.

Write a description of the patient-treatment dynamics that should be modeled, then decide which plan is best.`

const ICU_DIRECT_CALL_TYPE = `model: GPT-5.4`

const ICU_ASSIST_CALL_TYPE = `model: GPT-5.4`

const ICU_DIRECT_OUTPUT_RAW = `1) Final decision

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

0.69`

const ICU_ASSIST_OUTPUT_RAW = `1) final decision
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
- plan_3 result: {"event":"result","plans":[{"plan_id":"plan_3","final_score":15,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":15,"fluid_overload_penalty":0}}],"best_plan_id":"plan_3"}`

const ICU_SPEC_EXAMPLE = `root_model_name: icu_sepsis_treatment
requirements:
  general: |
    Build a reusable, action-driven DEVS simulation model for a simplified ICU sepsis treatment problem over a fixed 6-hour horizon. The model must represent one patient state evolving over time under exogenous treatment actions supplied entirely at runtime. Do not encode any candidate plans, named strategies, or plan-specific logic in the model. The same world model must be able to evaluate any valid action timeline using the same transition rules. The simulation must be deterministic: given the same stdin payload, it must always emit the same stdout trace and final result. If the implementation includes uncertainty wording from the narrative such as 'usually' or 'sometimes', resolve it into explicit deterministic rules and parameters documented in the model spec rather than random sampling. Time should be modeled in whole hours with a clear event order within each hour. The model should simulate at least hours 0 through 6 inclusive for tracing, with terminal scoring at the end of hour 6 after all effects due by that time have been applied. The DEVS design should separate concerns into reusable components such as action input handling, patient state evolution, delayed effect scheduling/application, scoring, and trace emission. All state transitions must be explainable from explicit rules. The generated code should be executable from stdin/stdout without requiring interactive input.
  scenario: |
    Model a single ICU patient with the following initial qualitative state at hour 0: blood pressure is low, infection burden is high, kidney stress is mild, and fluid overload risk/status is low/absent. Available intervention types are vasopressor, iv_fluids, and antibiotic. Interventions may be scheduled only during hours 0, 1, and 2 by input actions, but the world model should not hardcode this restriction internally unless driven by scenario validation rules from stdin; the engine should still be generic enough to process any action_timeline within the horizon. Required patient-treatment dynamics: (1) Vasopressor effect: raises blood pressure immediately in the hour it is given. Repeated vasopressor exposure increases the chance/risk of kidney stress worsening; for deterministic modeling, define a concrete rule such as cumulative vasopressor exposures causing kidney stress escalation when exposure count reaches specified thresholds. (2) IV fluids effect: no immediate blood pressure benefit in the same hour they are given; blood pressure support begins one hour later and lasts about two hours, with the builder note implying longer support should be captured, so define a deterministic duration that is explicitly documented and consistent with the note about longer fluid support. Repeated fluid use should accumulate toward fluid overload, with a deterministic rule for when overload becomes present and when its penalty applies. (3) Antibiotic effect: no immediate infection reduction; infection burden begins improving two hours after administration. Define deterministic infection burden transitions over time, such as high to medium to low after explicit delays/exposures, while preserving delayed causality. (4) Ongoing harm interaction: if infection burden remains high while blood pressure is low, kidney stress worsens over time. Define the exact per-hour escalation rule and event ordering needed to determine when this interaction applies. (5) State representation should use discrete categories sufficient for scoring: blood pressure at least low vs stable, infection burden as high/medium/low, kidney stress as mild/moderate/severe, and fluid overload as absent/present. (6) End-of-horizon scoring at the end of hour 6: stable blood pressure = 40 points, otherwise 0; infection burden low = 30, medium = 15, high = 0; kidney stress penalty mild = 0, moderate = 15, severe = 35; fluid overload present = additional 10-point penalty, absent = 0. Final score = blood pressure points + infection points - kidney penalty - fluid overload penalty. The model should also report the final categorical state. The model must be suitable for evaluating any supplied action timeline, though the task narrative mentions three example plans. The checker can supply those plans externally through stdin and compare resulting final scores. The model description should make it possible for generated code to evaluate which externally supplied plan is best without embedding those plans into the simulation logic.
  args_input_output: |
    Input must be a single batch JSON object read from stdin. It must contain an action_timeline field encoding time-indexed actions for the full run. Recommended schema: {"horizon_hours": 6, "initial_state": {"blood_pressure": "low", "infection_burden": "high", "kidney_stress": "mild", "fluid_overload": false}, "action_timeline": [{"time": 0, "actions": ["vasopressor"]}, {"time": 1, "actions": ["vasopressor"]}], "model_params": {...optional deterministic override parameters...}}. Actions for a given hour may be an array of zero or more intervention names. If multiple actions occur in the same hour, define and document deterministic handling. The implementation may support either a single patient run or multiple runs in one payload, but at minimum it must support one complete action_timeline per invocation. Output must be JSONL on stdout: one JSON object per line. Emit structured trace events during execution, for example an initial event, per-hour events, delayed-effect application events, state update events, and a terminal result event. Each trace event should include at least an event type, simulation time, and enough state detail to reconstruct why the final score occurred. The final line must be a result event JSON object containing at least: event="result", horizon_hours, final_state, score_breakdown, total_score, and the normalized action_timeline used. No markdown or explanatory prose should be printed to stdout. Error handling should also use JSONL with a final error event if input is invalid. Determinism requirement: the same stdin payload, including any optional model_params, must always reproduce the identical output trace and final result. The event ordering within each hour must be explicitly defined, for example: apply newly scheduled immediate actions for that hour, apply delayed effects becoming active at that hour, update ongoing interaction harms, compute/post state snapshot. The exact ordering chosen must be documented and used consistently by both simulator and checker.
base_folder: examples/icu_sepsis_treatment
skip_simulation_check: false
only_ensure_executable: false`

const WETLAB_INPUT = `You are running a small biology lab for an 8-hour day (hour 0..8).

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

Task: choose the best strategy among fixed scripts and explain why.`

const WETLAB_DIRECT_PROMPT_TEMPLATE = `system_prompt = (
    "You are a careful planning assistant. Solve the task directly without external tools. "
    "Be explicit about assumptions and produce a concise but complete answer."
)
user_prompt = (
    f"Task: {scene.title}\\n\\n"
    f"{scene.task_prompt}\\n\\n"
    "Return format:\\n"
    "1) Final decision\\n"
    "2) Key reasoning steps\\n"
    "3) Fragile assumptions\\n"
    "4) Confidence (0-1)"
)`

const DIRECT_SYSTEM_PROMPT = `You are a careful planning assistant. Solve the task directly without external tools. Be explicit about assumptions and produce a concise but complete answer.`

const DIRECT_USER_PROMPT_SUFFIX = `Return format:
1) Final decision
2) Key reasoning steps
3) Fragile assumptions
4) Confidence (0-1)`

const WETLAB_DIRECT_CALL_TYPE = `model: GPT-5.4`

const WETLAB_ASSIST_CALL_TYPE = `model: GPT-5.4`

const WETLAB_ASSIST_PROMPT_TEMPLATE = `prompt = (
    f"Task title: {scene.title}\\n\\n"
    f"Task prompt:\\n{scene.task_prompt}\\n\\n"
    "You can call \`run_devs_model\` to test hypotheses or plans. "
    "Use batch stdin mode: provide a full action timeline payload in one run.\\n\\n"
    f"Model spec (YAML):\\n{spec_text}\\n\\n"
    "Required procedure:\\n"
    "1) Propose a complete action timeline.\\n"
    "2) Send it as stdin_content in one tool call.\\n"
    "3) Read trace/final events. If needed, revise and resubmit a new full timeline.\\n\\n"
    "Return:\\n"
    "1) final decision\\n"
    "2) concise reasoning trace\\n"
    "3) stdin payload used\\n"
    "4) evidence from tool calls"
)`

const WETLAB_DIRECT_OUTPUT_RAW = `1) Final decision

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

0.63`

const WETLAB_ASSIST_OUTPUT_RAW = `1) final decision
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
- Decision uses these executable results directly.`

const WETLAB_SPEC_PROMPT_TEMPLATE = `system_prompt = (
    "You are an expert DEVS modeling assistant. Convert the task into a strict YAML-ready model spec. "
    "The world model must be reusable and action-driven (no hardcoded candidate plans). "
    "Runtime control comes from one batch stdin payload containing a full action timeline. "
    "Return JSON only (no markdown fences)."
)
user_prompt = (
    "Given the task below, output one JSON object with exactly these top-level keys:\n"
    "- root_model_name (string)\n"
    "- requirements (object with keys: general, scenario, args_input_output)\n"
    "- base_folder (string)\n"
    "- skip_simulation_check (boolean)\n"
    "- only_ensure_executable (boolean)\n\n"
    "Write requirements in clear English and complete enough for code generation and checker design.\n"
    "Hard constraints:\n"
    "1) Do not hardcode candidate plans/strategies inside the DEVS world model.\n"
    "2) Define stdin as one batch JSON payload with an action_timeline (time-indexed actions).\n"
    "3) Define stdout JSONL trace events and a final result event.\n"
    "4) Same stdin payload must always reproduce the same output trace/result.\n\n"
    f"Task title: {scene.title}\n"
    f"Task prompt:\n{scene.task_prompt}\n\n"
    f"Builder note:\n{scene.builder_note}"
)`

const WETLAB_SPEC_EXAMPLE = `root_model_name: wet_lab_assay_scheduling
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
base_folder: tasks/wet_lab_assay_scheduling`

const AGENT_WORKFLOW_SYSTEM_PROMPT = `You are an agent for model-based task solving.
You must follow this exact workflow and keep it explicit in your trace:
1) Parse the task and extract state variables, actions, delays, constraints, and scoring rules.
2) Draft a full DEVS model spec directly in your own output (YAML text). Do NOT call any tool for spec writing.
3) Call construct_devs_model(spec_yaml=...) exactly once to compile the drafted spec into an executable DEVS project.
4) Read tool return fields carefully (entrypoint, CLI args/stdin schema, stdout contract, example run) and use them as the execution contract.
5) Before final decision, run multiple what-if experiments with run_devs_model.
   - For fixed-script comparison tasks, run at least three candidates (A/B/C or equivalent).
   - Keep inputs valid under the returned schema.
6) In reasoning, cite model outputs (scores, traces, violations) instead of relying only on narrative intuition.
7) Produce final answer with: chosen option, concise evidence chain, and major assumptions.`

const WORKFLOW_DEMO_DATA = {
  wetlab: {
    commandArgs: '--simulate_time 9',
    constructCall: `construct_devs_model(spec_yaml=<assistant_drafted_spec_yaml>)`,
    constructResult: `{"status":"ok","entrypoint_module":"devs_project.run_wet_lab_assay_scheduling","required_command_args":"--simulate_time 9","call_mode":"stdin_batch_json_one_episode_per_run","stdin_schema":{"episode_id":"string","horizon":"int","samples":"list[str]","action_timeline":"[{hour, actions:[{type:start_stage, sample, stage:prepare|incubate|assay}]}]"},"stdout_contract":"jsonl trace + final {event:\"result\"}","example_run":"python -m devs_project.run_wet_lab_assay_scheduling --simulate_time 9 < payload.json"}`,
    firstUserPrompt: `${WETLAB_INPUT}\n\nAdditional instructions for model-spec generation:\n- Output one reusable DEVS world model spec (no hardcoded fixed winner).\n- Output keys must be: root_model_name, requirements{general,scenario,args_input_output}, base_folder, skip_simulation_check, only_ensure_executable.\n- Define stdin as one batch JSON payload with timeline actions.\n- Define stdout JSONL traces plus one final result event.\n- Determinism is required: same stdin must reproduce identical trace/result.`,
    reasoningBeforeRuns:
      `I have a valid invocation contract from construct_devs_model. I will run A/B/C as three separate episodes with --simulate_time 9, using stage values prepare|incubate|assay, then compare composite_score and invalid_action_count.`,
    runAInput:
      `run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"A","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"assay"}]},{"hour":4,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"}]},{"hour":8,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]}]}')`,
    runAResult:
      `{"event":"result","episode_id":"A","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":1,"prep_bonus_sample_ids":["X"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":21,"score":21,"invalid_action_count":0,"overall_valid":true,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"preparing"},"horizon":8}`,
    runBInput:
      `run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"B","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]}]}')`,
    runBResult:
      `{"event":"result","episode_id":"B","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":3,"prep_bonus_sample_ids":["X","Y","Z"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":23,"score":23,"invalid_action_count":0,"overall_valid":true,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"incubating"},"horizon":8}`,
    runCInput:
      `run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"C","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"},{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Z","stage":"assay"}]}]}')`,
    runCResult:
      `{"event":"result","episode_id":"C","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":2,"prep_bonus_sample_ids":["X","Y"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":22,"score":22,"invalid_action_count":3,"overall_valid":false,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"not_started"},"horizon":8}`,
    reasoningAfterRuns:
      `Executable comparison gives A=21, B=23, C=22.\nB is best by primary metric (composite_score), and also has zero invalid actions.\nC loses because lockout-driven invalid actions reduce effective completion quality.`,
  },
  icu: {
    commandArgs: '--simulate_time 6',
    constructCall: `construct_devs_model(spec_yaml=<assistant_drafted_spec_yaml>)`,
    constructResult: `{"status":"ok","entrypoint_module":"devs_project.run_icu_sepsis_treatment","required_command_args":"--simulate_time 6","call_mode":"stdin_batch_json_single_or_multi_plan","stdin_schema":{"horizon_hours":"int","initial_state":"dict","plans":"[{plan_id, action_timeline}]"},"stdout_contract":"jsonl trace + final {event:\"result\", plans:[...], best_plan_id}"}`,
    firstUserPrompt: `${ICU_INPUT}\n\nAdditional instructions for model-spec generation:\n- Build one reusable action-driven DEVS world model (not plan-specific logic).\n- Output keys must be: root_model_name, requirements{general,scenario,args_input_output}, base_folder, skip_simulation_check, only_ensure_executable.\n- Define stdin as one batch payload containing initial state + candidate action timelines.\n- Define stdout as JSONL trace + final result event with score breakdown.\n- Resolve narrative uncertainty into explicit deterministic transition rules.`,
    reasoningBeforeRuns:
      `I will run the three candidate plans under the same constructed model and compare final_score plus score_breakdown from each result event.`,
    runAInput:
      `run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_1","action_timeline":{"0":["vasopressor"],"1":["vasopressor"]}}]}')`,
    runAResult:
      `{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_1","final_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"severe","fluid_overload":false},"final_score":-35,"score_breakdown":{"blood_pressure_points":0,"infection_points":0,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_1"}`,
    runBInput:
      `run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_2","action_timeline":{"0":["antibiotic"],"1":["iv_fluids"]}}]}')`,
    runBResult:
      `{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_2","final_state":{"blood_pressure":"low","infection_burden":"low","kidney_stress":"severe","fluid_overload":false},"final_score":-5,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_2"}`,
    runCInput:
      `run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_3","action_timeline":{"0":["iv_fluids"],"1":["vasopressor"],"2":["antibiotic"]}}]}')`,
    runCResult:
      `{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_3","final_state":{"blood_pressure":"low","infection_burden":"low","kidney_stress":"moderate","fluid_overload":false},"final_score":15,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":15,"fluid_overload_penalty":0}}],"best_plan_id":"plan_3"}`,
    reasoningAfterRuns:
      `Model outputs rank plan_3 (15) > plan_2 (-5) > plan_1 (-35).\nplan_3 is the only one that reaches low infection with moderate kidney penalty under these deterministic delays.`,
  },
}

const CASES = [
  {
    id: 'sa',
    title: 'Strategic Airlift (SA) Case',
    tag: 'Benchmark example from devs_fast + gpt-5.2 run artifact.',
    inputText: SA_INPUT,
    sources: {
      input: 'benchmark/SA/SA.yaml',
      plan:
        'devs_tester2/active_runs/devs_fast_gpt-5.2/SA_example/strategic_airlift/devs_project/_analysis_logs/snapshot_stage_2_construction.json',
      code:
        'devs_tester2/active_runs/devs_fast_gpt-5.2/SA_example/strategic_airlift/devs_project/',
      eval:
        'devs_tester2/active_runs/devs_fast_gpt-5.2/SA_example/strategic_airlift_eval_results/summary.json + benchmark/SA/checker.py',
    },
    planTree: {
      id: 'sa-root',
      name: 'StrategicAirlift_D0',
      type: 'coupled',
      summary: 'Facility generation -> queue/coordinator assignment -> fleet cycles -> destination delivery logs',
      initArgs: [
        'total_duration',
        'num_aircraft',
        'pallet_interval',
        'pallet_expiration_time',
        'flight_time',
        'unload_time',
        'return_time',
        'maintenance_time',
      ],
      initArgsTyped: [
        { name: 'total_duration', type: 'float' },
        { name: 'num_aircraft', type: 'int' },
        { name: 'pallet_interval', type: 'float' },
        { name: 'pallet_expiration_time', type: 'float' },
        { name: 'flight_time', type: 'float' },
        { name: 'unload_time', type: 'float' },
        { name: 'return_time', type: 'float' },
        { name: 'maintenance_time', type: 'float' },
      ],
      ports: { input: [], output: [] },
      portsTyped: { input: [], output: [] },
      details: {
        function:
          'Top-level coupled model wires four major subsystems: FacilityGenerator, OpsCenterQueueCoordinator, AircraftFleet, and DestinationSink.',
        logging:
          'Root container itself does not emit KPI logs; required events are produced by submodels (facility, queue, coordinator, aircraft, destination).',
        schemas:
          'No boundary ports. Config args define deterministic timing and fleet size. Event schema is enforced by checker on generated JSONL records.',
      },
      children: [
        {
          id: 'sa-facility',
          name: 'FacilityGenerator',
          type: 'atomic',
          summary: 'Deterministic pallet source at t=0 and fixed interval thereafter',
          initArgs: ['pallet_interval', 'pallet_expiration_time'],
          initArgsTyped: [
            { name: 'pallet_interval', type: 'float' },
            { name: 'pallet_expiration_time', type: 'float' },
          ],
          ports: { input: [], output: ['pallet_out'] },
          portsTyped: { input: [], output: [{ name: 'pallet_out', type: 'dict' }] },
          details: {
            function:
              'Emits pallet_out={pallet_id,gen_time,expiration_time}. expiration_time is absolute and equals gen_time + pallet_expiration_time.',
            logging: 'Logs pallet_generated with payload {pallet_id, expiration_time}.',
            schemas: 'pallet_out carries full pallet tuple for queue insertion and deadline checks.',
          },
          children: [],
        },
        {
          id: 'sa-ops',
          name: 'OpsCenterQueueCoordinator',
          type: 'coupled',
          summary: 'Queue with active expiration + idle-aircraft assignment coordinator',
          initArgs: ['num_aircraft'],
          initArgsTyped: [{ name: 'num_aircraft', type: 'int' }],
          ports: { input: ['pallet_in', 'aircraft_idle_in'], output: ['assignment_out'] },
          portsTyped: {
            input: [
              { name: 'pallet_in', type: 'dict' },
              { name: 'aircraft_idle_in', type: 'dict' },
            ],
            output: [{ name: 'assignment_out', type: 'dict' }],
          },
          details: {
            function:
              'Couples LoadingQueueWithExpiration and IdleAssignmentCoordinator through dequeue request/response and queue status signals.',
            logging:
              'assignment_created is emitted by IdleAssignmentCoordinator; queue logs are emitted by LoadingQueueWithExpiration.',
            schemas:
              'assignment_out={aircraft_id,pallet}; queue status and dequeue handshake are internal couplings.',
          },
          children: [
            {
              id: 'sa-queue',
              name: 'LoadingQueueWithExpiration',
              type: 'atomic',
              summary: 'FIFO queue with exact expiration at expiration_time',
              initArgs: [],
              initArgsTyped: [],
              ports: { input: ['pallet_in', 'dequeue_req_in'], output: ['pallet_out', 'queue_status_out'] },
              portsTyped: {
                input: [
                  { name: 'pallet_in', type: 'dict' },
                  { name: 'dequeue_req_in', type: 'dict' },
                ],
                output: [
                  { name: 'pallet_out', type: 'dict' },
                  { name: 'queue_status_out', type: 'dict' },
                ],
              },
              details: {
                function:
                  'Applies arrival->expiration->dequeue ordering at same timestamp. Emits queue_size updates after enqueue/expire/dequeue.',
                logging: 'Logs pallet_queued and pallet_expired with required payload fields.',
                schemas:
                  'pallet_in={pallet_id,gen_time,expiration_time}; dequeue_req_in={request:"next"}; pallet_out excludes expiration_time by design.',
              },
              children: [],
            },
            {
              id: 'sa-assign',
              name: 'IdleAssignmentCoordinator',
              type: 'atomic',
              summary: 'Matches lowest-id idle aircraft with next FIFO pallet',
              initArgs: ['num_aircraft'],
              initArgsTyped: [{ name: 'num_aircraft', type: 'int' }],
              ports: {
                input: ['aircraft_idle_in', 'queue_status_in', 'pallet_in'],
                output: ['assignment_out', 'dequeue_req_out'],
              },
              portsTyped: {
                input: [
                  { name: 'aircraft_idle_in', type: 'dict' },
                  { name: 'queue_status_in', type: 'dict' },
                  { name: 'pallet_in', type: 'dict' },
                ],
                output: [
                  { name: 'assignment_out', type: 'dict' },
                  { name: 'dequeue_req_out', type: 'dict' },
                ],
              },
              details: {
                function:
                  'Tracks known idle aircraft and queue size; dispatches dequeue request then emits assignment_created when pallet arrives.',
                logging: 'Logs assignment_created plus model lifecycle diagnostics.',
                schemas: 'assignment_out={aircraft_id,pallet:{pallet_id,gen_time}}; dequeue_req_out={request:"next"}.',
              },
              children: [],
            },
          ],
        },
        {
          id: 'sa-fleet',
          name: 'AircraftFleet',
          type: 'coupled',
          summary: 'Fleet-level broadcast + per-aircraft mission/maintenance cycles + event mux',
          initArgs: ['num_aircraft', 'flight_time', 'unload_time', 'return_time', 'maintenance_time'],
          initArgsTyped: [
            { name: 'num_aircraft', type: 'int' },
            { name: 'flight_time', type: 'float' },
            { name: 'unload_time', type: 'float' },
            { name: 'return_time', type: 'float' },
            { name: 'maintenance_time', type: 'float' },
          ],
          ports: { input: ['assignment_in'], output: ['aircraft_idle_out', 'delivery_out'] },
          portsTyped: {
            input: [{ name: 'assignment_in', type: 'dict' }],
            output: [
              { name: 'aircraft_idle_out', type: 'dict' },
              { name: 'delivery_out', type: 'dict' },
            ],
          },
          details: {
            function:
              'Broadcasts assignments to AircraftUnit instances, merges idle/delivery events, and seeds initial idle signals.',
            logging: 'Aircraft mission and maintenance events are emitted by child atomic models.',
            schemas: 'delivery_out={pallet_id,aircraft_id,latency}; aircraft_idle_out={aircraft_id}.',
          },
          children: [
            {
              id: 'sa-fleet-mux',
              name: 'FleetEventMux',
              type: 'atomic',
              summary: 'Fleet-level idle/delivery mux; seeds initial idle aircraft notifications',
              initArgs: ['num_aircraft'],
              initArgsTyped: [{ name: 'num_aircraft', type: 'int' }],
              ports: {
                input: ['aircraft_idle_in', 'delivery_in'],
                output: ['aircraft_idle_out', 'delivery_out'],
              },
              portsTyped: {
                input: [
                  { name: 'aircraft_idle_in', type: 'dict' },
                  { name: 'delivery_in', type: 'dict' },
                ],
                output: [
                  { name: 'aircraft_idle_out', type: 'dict' },
                  { name: 'delivery_out', type: 'dict' },
                ],
              },
              details: {
                function: 'Collects per-aircraft idle/delivery events and forwards them as fleet-level outputs.',
                logging: 'Seeds initial idle events for aircraft_id=1..num_aircraft at t=0.',
                schemas: 'aircraft_idle_out={aircraft_id}; delivery_out={pallet_id,aircraft_id,latency}.',
              },
              children: [],
            },
            {
              id: 'sa-aircraft-unit-template',
              name: 'AircraftUnit (per aircraft instance)',
              type: 'coupled',
              summary: 'Each aircraft_i has a mission controller + maintenance controller',
              initArgs: ['aircraft_id', 'flight_time', 'unload_time', 'return_time', 'maintenance_time'],
              initArgsTyped: [
                { name: 'aircraft_id', type: 'int' },
                { name: 'flight_time', type: 'float' },
                { name: 'unload_time', type: 'float' },
                { name: 'return_time', type: 'float' },
                { name: 'maintenance_time', type: 'float' },
              ],
              ports: { input: ['assignment_in'], output: ['idle_out', 'delivery_out'] },
              portsTyped: {
                input: [{ name: 'assignment_in', type: 'dict' }],
                output: [
                  { name: 'idle_out', type: 'dict' },
                  { name: 'delivery_out', type: 'dict' },
                ],
              },
              details: {
                function:
                  'assignment_in enters mission controller; maintenance_start and maintenance_done are coupled internally; idle_out and delivery_out are exported upward.',
                logging: 'Mission controller emits depart/return/maintenance_start; maintenance controller emits maintenance_end.',
                schemas: 'delivery_out={pallet_id,aircraft_id,latency}; idle_out={aircraft_id}.',
              },
              children: [
                {
                  id: 'sa-aircraft-mission',
                  name: 'AircraftMissionController',
                  type: 'coupled',
                  summary: 'Mission phase logic with MissionStateMachine + MissionLogEmitter',
                  initArgs: ['aircraft_id', 'flight_time', 'unload_time', 'return_time'],
                  initArgsTyped: [
                    { name: 'aircraft_id', type: 'int' },
                    { name: 'flight_time', type: 'float' },
                    { name: 'unload_time', type: 'float' },
                    { name: 'return_time', type: 'float' },
                  ],
                  ports: {
                    input: ['assignment_in', 'maintenance_done_in'],
                    output: ['delivery_out', 'maintenance_start_out'],
                  },
                  portsTyped: {
                    input: [
                      { name: 'assignment_in', type: 'dict' },
                      { name: 'maintenance_done_in', type: 'dict' },
                    ],
                    output: [
                      { name: 'delivery_out', type: 'dict' },
                      { name: 'maintenance_start_out', type: 'dict' },
                    ],
                  },
                  details: {
                    function: 'Runs mission state transitions: IDLE -> FLYING -> UNLOADING -> RETURNING.',
                    logging: 'Emits mission event records via log_out to MissionLogEmitter.',
                    schemas: 'delivery_out includes latency; maintenance_start_out triggers maintenance controller.',
                  },
                  children: [
                    {
                      id: 'sa-aircraft-mission-sm',
                      name: 'MissionStateMachine',
                      type: 'atomic',
                      summary: 'Core mission DEVS state machine for depart/unload/return timing',
                      initArgs: ['aircraft_id', 'flight_time', 'unload_time', 'return_time'],
                      initArgsTyped: [
                        { name: 'aircraft_id', type: 'int' },
                        { name: 'flight_time', type: 'float' },
                        { name: 'unload_time', type: 'float' },
                        { name: 'return_time', type: 'float' },
                      ],
                      ports: {
                        input: ['assignment_in', 'maintenance_done_in'],
                        output: ['delivery_out', 'maintenance_start_out', 'log_out'],
                      },
                      portsTyped: {
                        input: [
                          { name: 'assignment_in', type: 'dict' },
                          { name: 'maintenance_done_in', type: 'dict' },
                        ],
                        output: [
                          { name: 'delivery_out', type: 'dict' },
                          { name: 'maintenance_start_out', type: 'dict' },
                          { name: 'log_out', type: 'dict' },
                        ],
                      },
                      details: {
                        function:
                          'Generates depart/return/maintenance_start events and delivery payloads with checker-consistent cycle timing.',
                        logging: 'Mission events are emitted as log records through log_out port.',
                        schemas: 'delivery_out={pallet_id,aircraft_id,latency}; log_out={time,entity,event,payload}.',
                      },
                      children: [],
                    },
                    {
                      id: 'sa-aircraft-mission-log',
                      name: 'MissionLogEmitter',
                      type: 'atomic',
                      summary: 'Consumes log_out records and writes standardized mission logs',
                      initArgs: [],
                      initArgsTyped: [],
                      ports: { input: ['log_in'], output: [] },
                      portsTyped: {
                        input: [{ name: 'log_in', type: 'dict' }],
                        output: [],
                      },
                      details: {
                        function: 'Writes mission event records to simulation logger without altering payload semantics.',
                        logging: 'No additional transformation; pass-through logging behavior.',
                        schemas: 'log_in uses event schema {time,entity,event,payload}.',
                      },
                      children: [],
                    },
                  ],
                },
                {
                  id: 'sa-aircraft-maint',
                  name: 'AircraftMaintenanceController',
                  type: 'atomic',
                  summary: 'Maintenance phase, then idle signal emission',
                  initArgs: ['aircraft_id', 'maintenance_time'],
                  initArgsTyped: [
                    { name: 'aircraft_id', type: 'int' },
                    { name: 'maintenance_time', type: 'float' },
                  ],
                  ports: {
                    input: ['maintenance_start_in'],
                    output: ['idle_out', 'maintenance_done_out'],
                  },
                  portsTyped: {
                    input: [{ name: 'maintenance_start_in', type: 'dict' }],
                    output: [
                      { name: 'idle_out', type: 'dict' },
                      { name: 'maintenance_done_out', type: 'dict' },
                    ],
                  },
                  details: {
                    function: 'On maintenance_start_in, runs for maintenance_time then emits idle_out and maintenance_done_out.',
                    logging: 'Logs maintenance_end at maintenance completion time.',
                    schemas: 'idle_out={aircraft_id}; maintenance_done_out={aircraft_id}.',
                  },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 'sa-dst',
          name: 'DestinationSink',
          type: 'atomic',
          summary: 'Records pallet_delivered events and final delivered count',
          initArgs: [],
          initArgsTyped: [],
          ports: { input: ['delivery_in'], output: [] },
          portsTyped: { input: [{ name: 'delivery_in', type: 'dict' }], output: [] },
          details: {
            function: 'On each delivery_in message, logs pallet_delivered at current simulation time.',
            logging: 'Logs model_created, model_initialized, pallet_delivered, model_finalized.',
            schemas: 'delivery_in payload: {pallet_id:int, aircraft_id:int, latency:float}.',
          },
          children: [],
        },
      ],
    },
    codeGraph: {
      nodes: [
        {
          id: 'n1',
          label: 'StrategicAirlift_D0 (coupled)',
          modelType: 'coupled',
          x: 480,
          y: 46,
          ports: { in: [], out: [] },
          portsTyped: { in: [], out: [] },
          file: 'StrategicAirlift_D0.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        total_duration: float,
        num_aircraft: int,
        pallet_interval: float,
        pallet_expiration_time: float,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            total_duration (float): Total simulation time horizon in seconds (controller stops at this time).
            num_aircraft (int): Number of aircraft (>=1). Aircraft IDs are 1..num_aircraft.
            pallet_interval (float): Seconds between pallet generations.
            pallet_expiration_time (float): Seconds after generation when a pallet expires if still in queue.
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination; delivery recorded at end of this interval.
            return_time (float): Seconds for aircraft to fly destination -> facility.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Internal/hardcoded parameters (not part of public ports)
        self.param: dict = {
            "model_path": "StrategicAirlift_D0.StrategicAirlift_D0",
        }

        # Normalize configuration
        total_duration_n = float(total_duration)
        num_aircraft_n = int(num_aircraft)
        pallet_interval_n = float(pallet_interval)
        pallet_expiration_time_n = float(pallet_expiration_time)
        flight_time_n = float(flight_time)
        unload_time_n = float(unload_time)
        return_time_n = float(return_time)
        maintenance_time_n = float(maintenance_time)

        # No boundary ports (self-contained model).

        # Instantiate sub-components
        facility = FacilityGenerator(
            name="facility",
            parent=self,
            pallet_interval=pallet_interval_n,
            pallet_expiration_time=pallet_expiration_time_n,
        )

        ops_center = OpsCenterQueueCoordinator(
            name="ops_center",
            parent=self,
            num_aircraft=num_aircraft_n,
        )

        fleet = AircraftFleet(
            name="fleet",
            parent=self,
            num_aircraft=num_aircraft_n,
            flight_time=flight_time_n,
            unload_time=unload_time_n,
            return_time=return_time_n,
            maintenance_time=maintenance_time_n,
        )

        destination = DestinationSink(
            name="destination",
            parent=self,
        )

        # Register components
        self.add_component(facility)
        self.add_component(ops_center)
        self.add_component(fleet)
        self.add_component(destination)

        # Define internal couplings (IC)
        # Facility -> Ops Center (pallets)
        self.add_coupling(facility.output["pallet_out"], ops_center.input["pallet_in"])

        # Fleet -> Ops Center (idle aircraft notifications)
        self.add_coupling(fleet.output["aircraft_idle_out"], ops_center.input["aircraft_idle_in"])

        # Ops Center -> Fleet (assignment commands)
        self.add_coupling(ops_center.output["assignment_out"], fleet.input["assignment_in"])

        # Fleet -> Destination (delivery notifications)
        self.add_coupling(fleet.output["delivery_out"], destination.input["delivery_in"])`,
          },
        },
        {
          id: 'n2',
          label: 'FacilityGenerator',
          modelType: 'atomic',
          x: 90,
          y: 140,
          ports: { in: [], out: ['pallet_out'] },
          portsTyped: { in: [], out: [{ name: 'pallet_out', type: 'dict' }] },
          file: 'StrategicAirlift_D0_libs/FacilityGenerator.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, pallet_interval: float, pallet_expiration_time: float):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            pallet_interval (float): Seconds between pallet generations; next_generation_time increments by this value.
            pallet_expiration_time (float): Seconds after generation when a pallet expires if still in queue;
                expiration_time = gen_time + pallet_expiration_time.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        if not isinstance(pallet_interval, float):
            raise TypeError("pallet_interval must be a float")
        if not isinstance(pallet_expiration_time, float):
            raise TypeError("pallet_expiration_time must be a float")
        if pallet_interval <= 0.0:
            raise ValueError("pallet_interval must be > 0.0")
        if pallet_expiration_time < 0.0:
            raise ValueError("pallet_expiration_time must be >= 0.0")

        # Output port
        self.add_out_port(Port(dict, "pallet_out"))

        # Configuration
        self.pallet_interval = pallet_interval
        self.pallet_expiration_time = pallet_expiration_time

        # Internal hardcoded parameters
        self.param = {
            "phase_emit": "EMIT"
        }

        # Internal state
        self.next_pallet_id = 1
        self.next_generation_time = 0.0

        # Prepared output for next lambdaf (dict)
        # structure:
        #   pallet_id (int)
        #   gen_time (float)
        #   expiration_time (float)
        self._out_pallet_prepared = {}`,
            initialize: `    def initialize(self):
        # Initial state required by specification
        self.next_pallet_id = 1
        self.next_generation_time = 0.0

        # Prepare the very first pallet to be emitted at T=0.0
        gen_time = 0.0
        self._out_pallet_prepared = {
            "pallet_id": int(self.next_pallet_id),
            "gen_time": float(gen_time),
            "expiration_time": float(gen_time + self.pallet_expiration_time),
        }

        # Update "next" pointers (deterministic)
        self.next_pallet_id += 1
        self.next_generation_time = gen_time + self.pallet_interval

        # Schedule immediate output at T=0.0
        self.hold_in(self.param["phase_emit"], 0.0)`,
            lambdaf: `    def lambdaf(self):
        # Output only (no state changes, no logging)
        if self.phase == self.param["phase_emit"]:
            self.output["pallet_out"].add(self._out_pallet_prepared)`,
            deltint: `    def deltint(self):
        # Called right after lambdaf at the same simulation time
        if self.phase == self.param["phase_emit"]:
            t_now = float(get_current_time())

            # Log the pallet that was generated/emitted at this time
            self.logger.info(
                {
                    "time": t_now,
                    "entity": "facility",
                    "event": "pallet_generated",
                    "payload": {
                        "pallet_id": int(self._out_pallet_prepared["pallet_id"]),
                        "expiration_time": float(self._out_pallet_prepared["expiration_time"]),
                    },
                },
                log_type="PROCESS",
            )

            # Prepare the next pallet, scheduled at self.next_generation_time
            next_gen_time = float(self.next_generation_time)
            self._out_pallet_prepared = {
                "pallet_id": int(self.next_pallet_id),
                "gen_time": float(next_gen_time),
                "expiration_time": float(next_gen_time + self.pallet_expiration_time),
            }

            # Advance deterministic schedule
            self.next_pallet_id += 1
            self.next_generation_time = next_gen_time + self.pallet_interval

            # Schedule next internal event after exactly pallet_interval seconds
            sigma = max(0.0, next_gen_time - t_now)
            self.hold_in(self.param["phase_emit"], sigma)
        else:
            # Should not happen; remain passive
            self.hold_in(self.phase, float("inf"))`,
            deltext: `    def deltext(self, e: float):
        # No external inputs required by specification; keep current schedule
        remaining = self.ta() - float(e)
        self.hold_in(self.phase, max(0.0, remaining))`,
            exit: `    def exit(self):
        # No extra stdout logs beyond required event logs
        return`,
          },
        },
        {
          id: 'n3',
          label: 'OpsCenterQueueCoordinator (coupled)',
          modelType: 'coupled',
          x: 300,
          y: 140,
          ports: { in: ['pallet_in', 'aircraft_idle_in'], out: ['assignment_out'] },
          portsTyped: {
            in: [
              { name: 'pallet_in', type: 'dict' },
              { name: 'aircraft_idle_in', type: 'dict' },
            ],
            out: [{ name: 'assignment_out', type: 'dict' }],
          },
          file: 'StrategicAirlift_D0_libs/OpsCenterQueueCoordinator.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, num_aircraft: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft in the fleet (>=1).
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Hardcoded internal parameters (none required for this coupled container).
        self.param: dict = {
            "container_role": "queue_and_assignment_coupler"
        }

        # System boundary ports
        self.add_in_port(Port(dict, "pallet_in"))
        self.add_in_port(Port(dict, "aircraft_idle_in"))
        self.add_out_port(Port(dict, "assignment_out"))

        # Sub-model instances
        loading_queue = LoadingQueueWithExpiration(
            name="loading_queue",
            parent=self,
        )

        idle_assignment_coordinator = IdleAssignmentCoordinator(
            name="idle_assignment_coordinator",
            parent=self,
            num_aircraft=num_aircraft,
        )

        # Register components
        self.add_component(loading_queue)
        self.add_component(idle_assignment_coordinator)

        # Couplings
        # EIC: external inputs -> internal submodels
        self.add_coupling(self.input["pallet_in"], loading_queue.input["pallet_in"])
        self.add_coupling(self.input["aircraft_idle_in"], idle_assignment_coordinator.input["aircraft_idle_in"])

        # IC: queue <-> coordinator request/response loop + queue status feedback
        self.add_coupling(idle_assignment_coordinator.output["dequeue_req_out"], loading_queue.input["dequeue_req_in"])
        self.add_coupling(loading_queue.output["pallet_out"], idle_assignment_coordinator.input["pallet_in"])
        self.add_coupling(loading_queue.output["queue_status_out"], idle_assignment_coordinator.input["queue_status_in"])

        # EOC: internal outputs -> external outputs
        self.add_coupling(idle_assignment_coordinator.output["assignment_out"], self.output["assignment_out"])`,
          },
        },
        {
          id: 'n4',
          label: 'LoadingQueueWithExpiration',
          modelType: 'atomic',
          x: 220,
          y: 265,
          ports: { in: ['pallet_in', 'dequeue_req_in'], out: ['pallet_out', 'queue_status_out'] },
          portsTyped: {
            in: [
              { name: 'pallet_in', type: 'dict' },
              { name: 'dequeue_req_in', type: 'dict' },
            ],
            out: [
              { name: 'pallet_out', type: 'dict' },
              { name: 'queue_status_out', type: 'dict' },
            ],
          },
          file: 'StrategicAirlift_D0_libs/OpsCenterQueueCoordinator_libs/LoadingQueueWithExpiration.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "pallet_in"))
        self.add_in_port(Port(dict, "dequeue_req_in"))
        self.add_out_port(Port(dict, "pallet_out"))
        self.add_out_port(Port(dict, "queue_status_out"))

        # Internal hardcoded parameters
        self.param = {
            "infinity": math.inf
        }

        # State
        # queue: list[dict]
        #   - (dict): pallet
        #       pallet_id (int): Unique pallet identifier
        #       gen_time (float): Generation time
        #       expiration_time (float): Absolute expiration time while in queue
        self.queue = []
        self.total_expired = 0

        # Pending outputs to be emitted in phase EMIT
        self._pending_pallet_out = []         # list[dict] each: {'pallet_id': int, 'gen_time': float}
        self._pending_queue_status_out = []   # list[dict] each: {'queue_size': int}

        # Initialize phase (will be set in initialize())
        self.hold_in("WAIT", self.param["infinity"])`,
            initialize: `    def initialize(self):
        self.queue = []
        self.total_expired = 0
        self._pending_pallet_out = []
        self._pending_queue_status_out = []
        self._schedule_next(t_now=get_current_time())`,
            exit: `    def exit(self):
        # No additional stdout events beyond the required operational events.
        return`,
            lambdaf: `    def lambdaf(self):
        if self.phase == "EMIT":
            for msg in self._pending_pallet_out:
                self.output["pallet_out"].add(msg)
            for msg in self._pending_queue_status_out:
                self.output["queue_status_out"].add(msg)`,
            deltint: `    def deltint(self):
        t_now = get_current_time()
        old_phase = self.phase

        if old_phase == "WAIT":
            # Internal timeout corresponds to the next expiration time
            expired_any = self._expire_at_time(t_now=t_now)
            if expired_any:
                # One queue status update after the expiration removals batch (size changed)
                self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})

        elif old_phase == "EMIT":
            # Outputs have already been emitted in lambdaf; now clear pending output buffers.
            self._pending_pallet_out = []
            self._pending_queue_status_out = []

        self._schedule_next(t_now=t_now)`,
            deltext: `    def deltext(self, e: float):
        t_now = get_current_time()

        # Same-timestamp ordering requirement (queue-side):
        # 1) arrivals/enqueue first
        # 2) expiration removals for expiration_time == t_now
        # Dequeue requests are processed after expiration to prevent assignment of expired pallets.
        self._process_arrivals(t_now=t_now)
        self._process_expirations_due_now(t_now=t_now)
        self._process_dequeue_requests(t_now=t_now)

        self._schedule_next(t_now=t_now)`,
            deltcon: `    def deltcon(self):
        """
        Confluent transition:
            - For phase WAIT (expiration-driven internal events), process external first to guarantee:
              arrivals/enqueue happen before expiration at the same timestamp.
            - For phase EMIT (sigma=0), process internal first to clear pending outputs already emitted by lambdaf,
              then process external.
        Note: In DEVS, lambdaf is executed before deltcon when an internal event is scheduled.
        """
        t_now = get_current_time()
        old_phase = self.phase

        if old_phase == "WAIT":
            # External first
            self._process_arrivals(t_now=t_now)
            self._process_expirations_due_now(t_now=t_now)
            self._process_dequeue_requests(t_now=t_now)

            # Then internal (may attempt expiration again; should be no-ops if already expired in external processing)
            expired_any = self._expire_at_time(t_now=t_now)
            if expired_any:
                self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})

        else:
            # Internal first (especially important for EMIT to avoid re-emitting already-emitted pending messages)
            if old_phase == "EMIT":
                self._pending_pallet_out = []
                self._pending_queue_status_out = []

            # Then external
            self._process_arrivals(t_now=t_now)
            self._process_expirations_due_now(t_now=t_now)
            self._process_dequeue_requests(t_now=t_now)

        self._schedule_next(t_now=t_now)`,
            _process_arrivals: `    def _process_arrivals(self, t_now: float):
        for pallet in self.input["pallet_in"].values:
            # Expected structure:
            # pallet_id (int), gen_time (float), expiration_time (float)
            self.queue.append(
                {
                    "pallet_id": int(pallet["pallet_id"]),
                    "gen_time": float(pallet["gen_time"]),
                    "expiration_time": float(pallet["expiration_time"]),
                }
            )

            self.logger.info(
                {
                    "time": float(t_now),
                    "entity": "queue",
                    "event": "pallet_queued",
                    "payload": {
                        "pallet_id": int(pallet["pallet_id"]),
                        "queue_size": int(len(self.queue)),
                    },
                },
                log_type="PROCESS",
            )

            # After enqueue, queue size changed -> status update
            self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})`,
            _process_expirations_due_now: `    def _process_expirations_due_now(self, t_now: float):
        # Apply the required "active expiration" check at current timestamp for external transitions.
        expired_any = self._expire_at_time(t_now=t_now)
        if expired_any:
            # One status update after expiration removals batch
            self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})`,
            _process_dequeue_requests: `    def _process_dequeue_requests(self, t_now: float):
        for req in self.input["dequeue_req_in"].values:
            # Expected structure:
            # request (str): "next"
            if str(req.get("request", "")) != "next":
                continue

            if len(self.queue) > 0:
                pallet = self.queue.pop(0)
                self._pending_pallet_out.append(
                    {"pallet_id": int(pallet["pallet_id"]), "gen_time": float(pallet["gen_time"])}
                )
                # Successful dequeue changes queue size -> status update
                self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})`,
            _expire_at_time: `    def _expire_at_time(self, t_now: float) -> bool:
        """
        Remove and log every pallet whose expiration_time equals t_now.
        Returns:
            (bool): True if at least one pallet expired.
        """
        if not self.queue:
            return False

        expired = []
        kept = []
        for pallet in self.queue:
            if float(pallet["expiration_time"]) == float(t_now):
                expired.append(pallet)
            else:
                kept.append(pallet)

        if not expired:
            return False

        self.queue = kept
        for pallet in expired:
            self.total_expired += 1
            self.logger.info(
                {
                    "time": float(t_now),
                    "entity": "queue",
                    "event": "pallet_expired",
                    "payload": {
                        "pallet_id": int(pallet["pallet_id"]),
                        "total_expired": int(self.total_expired),
                    },
                },
                log_type="PROCESS",
            )
        return True`,
            _next_expiration_time: `    def _next_expiration_time(self) -> float:
        if not self.queue:
            return self.param["infinity"]
        return min(float(p["expiration_time"]) for p in self.queue)`,
            _schedule_next: `    def _schedule_next(self, t_now: float):
        # If there are pending outputs, emit them immediately.
        if self._pending_pallet_out or self._pending_queue_status_out:
            self.hold_in("EMIT", 0.0)
            return

        # Otherwise, wait until next expiration (or infinity if empty).
        next_exp = self._next_expiration_time()
        if next_exp == self.param["infinity"]:
            self.hold_in("WAIT", self.param["infinity"])
            return

        sigma = float(next_exp) - float(t_now)
        # Guard against tiny negative due to float representation; keep exactness by scheduling immediate only if needed.
        if sigma < 0.0:
            sigma = 0.0
        self.hold_in("WAIT", sigma)`,
          },
        },
        {
          id: 'n5',
          label: 'IdleAssignmentCoordinator',
          modelType: 'atomic',
          x: 380,
          y: 265,
          ports: { in: ['aircraft_idle_in', 'queue_status_in', 'pallet_in'], out: ['assignment_out', 'dequeue_req_out'] },
          portsTyped: {
            in: [
              { name: 'aircraft_idle_in', type: 'dict' },
              { name: 'queue_status_in', type: 'dict' },
              { name: 'pallet_in', type: 'dict' },
            ],
            out: [
              { name: 'assignment_out', type: 'dict' },
              { name: 'dequeue_req_out', type: 'dict' },
            ],
          },
          file: 'StrategicAirlift_D0_libs/OpsCenterQueueCoordinator_libs/IdleAssignmentCoordinator.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, num_aircraft: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft (>=1). Used for aircraft_id domain and deterministic tie-breaker.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "aircraft_idle_in"))
        self.add_in_port(Port(dict, "queue_status_in"))
        self.add_in_port(Port(dict, "pallet_in"))
        self.add_out_port(Port(dict, "assignment_out"))
        self.add_out_port(Port(dict, "dequeue_req_out"))

        # Config
        self.num_aircraft = int(num_aircraft)

        # Internal hardcoded parameters
        self.param = {
            "passive_sigma": float("inf")
        }

        # Internal state
        self.idle_aircraft_ids = set()  # set[int]
        self.queue_size = 0  # int

        # Dequeue/assignment cycle tracking
        self.request_in_flight = False  # bool
        self.pending_aircraft_id = None  # int | None

        # Prepared outputs (used only by lambdaf)
        self._out_dequeue_req = None  # dict | None
        self._out_assignment = None  # dict | None

        # KPIs
        self.total_assignments = 0  # int

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "model_created",
                "payload": {
                    "num_aircraft": int(self.num_aircraft)
                },
            },
            log_type="PROCESS",
        )`,
            initialize: `    def initialize(self):
        self.idle_aircraft_ids = set()
        self.queue_size = 0

        self.request_in_flight = False
        self.pending_aircraft_id = None
        self._out_dequeue_req = None
        self._out_assignment = None

        self.total_assignments = 0

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "model_initialized",
                "payload": {
                    "num_aircraft": int(self.num_aircraft),
                    "queue_size": int(self.queue_size),
                    "known_idle_aircraft": int(len(self.idle_aircraft_ids)),
                },
            },
            log_type="PROCESS",
        )

        self.hold_in("IDLE", self.param["passive_sigma"])`,
            _log_error: `    def _log_error(self, message: str, payload: dict):
        err_payload = {"message": str(message)}
        for k, v in payload.items():
            err_payload[str(k)] = v
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "error",
                "payload": err_payload,
            },
            log_type="ERROR",
        )`,
            _validate_aircraft_id: `    def _validate_aircraft_id(self, aircraft_id: int) -> bool:
        if not isinstance(aircraft_id, int):
            return False
        return 1 <= aircraft_id <= self.num_aircraft`,
            _maybe_start_dequeue_request: `    def _maybe_start_dequeue_request(self) -> bool:
        """
        Start one dequeue request if:
          - no request is currently in flight
          - there is at least one known IDLE aircraft
          - queue_size > 0
        Deterministically selects the lowest aircraft_id among IDLE aircraft.
        """
        if self.request_in_flight:
            return False
        if self.pending_aircraft_id is not None:
            return False
        if self.queue_size <= 0:
            return False
        if len(self.idle_aircraft_ids) == 0:
            return False

        aircraft_id = min(self.idle_aircraft_ids)
        if not self._validate_aircraft_id(int(aircraft_id)):
            self._log_error(
                "invalid_aircraft_id_in_idle_set",
                {"aircraft_id": int(aircraft_id), "num_aircraft": int(self.num_aircraft)},
            )
            # Remove it to avoid stalling forever
            try:
                self.idle_aircraft_ids.remove(aircraft_id)
            except KeyError:
                pass
            return False

        self.pending_aircraft_id = int(aircraft_id)
        self.request_in_flight = True
        self._out_dequeue_req = {"request": "next"}
        return True`,
            deltext: `    def deltext(self, e: float):
        # Keep DEVS elapsed-time semantics (though we mostly use inf/0)
        _ = float(e)

        # 1) Incorporate queue availability updates first
        for msg in self.input["queue_status_in"].values:
            if not isinstance(msg, dict) or "queue_size" not in msg:
                self._log_error("malformed_queue_status_in", {"received": str(msg)})
                continue
            qsz = msg.get("queue_size")
            if not isinstance(qsz, int) or qsz < 0:
                self._log_error("invalid_queue_size", {"queue_size": qsz})
                continue
            self.queue_size = int(qsz)

        # 2) Incorporate fleet transition inputs that imply aircraft IDLE
        for msg in self.input["aircraft_idle_in"].values:
            if not isinstance(msg, dict) or "aircraft_id" not in msg:
                self._log_error("malformed_aircraft_idle_in", {"received": str(msg)})
                continue
            aid = msg.get("aircraft_id")
            if not isinstance(aid, int):
                self._log_error("invalid_aircraft_id_type", {"aircraft_id": str(aid)})
                continue
            if not self._validate_aircraft_id(int(aid)):
                self._log_error(
                    "aircraft_id_out_of_range",
                    {"aircraft_id": int(aid), "num_aircraft": int(self.num_aircraft)},
                )
                continue
            self.idle_aircraft_ids.add(int(aid))

        # 3) Handle dequeued pallet inputs (response to request)
        got_pallet_for_assignment = False
        for msg in self.input["pallet_in"].values:
            if not isinstance(msg, dict) or ("pallet_id" not in msg) or ("gen_time" not in msg):
                self._log_error("malformed_pallet_in", {"received": str(msg)})
                continue
            if not self.request_in_flight or self.pending_aircraft_id is None:
                self._log_error(
                    "unexpected_pallet_without_request",
                    {"pallet_id": msg.get("pallet_id", -1)},
                )
                continue

            pallet_id = msg.get("pallet_id")
            gen_time = msg.get("gen_time")
            if not isinstance(pallet_id, int) or not isinstance(gen_time, float):
                self._log_error(
                    "invalid_pallet_fields",
                    {"pallet_id": str(pallet_id), "gen_time": str(gen_time)},
                )
                continue

            aircraft_id = int(self.pending_aircraft_id)

            # Create assignment payload for output (used by lambdaf)
            self._out_assignment = {
                "aircraft_id": int(aircraft_id),
                "pallet": {"pallet_id": int(pallet_id), "gen_time": float(gen_time)},
            }

            # Logging required event (assignment_created)
            self.logger.info(
                {
                    "time": float(get_current_time()),
                    "entity": "coordinator",
                    "event": "assignment_created",
                    "payload": {"aircraft_id": int(aircraft_id), "pallet_id": int(pallet_id)},
                },
                log_type="PROCESS",
            )

            # Update internal tracking immediately (assignment created now; output will happen at same sim time)
            self.total_assignments += 1
            if aircraft_id in self.idle_aircraft_ids:
                self.idle_aircraft_ids.remove(aircraft_id)
            self.request_in_flight = False
            self.pending_aircraft_id = None

            # Locally decrement queue size to enable same-timestamp loop continuation without waiting for a status update
            if self.queue_size > 0:
                self.queue_size = max(0, int(self.queue_size) - 1)

            got_pallet_for_assignment = True

            # Only one assignment can be output per internal event; if multiple pallets arrive, it's an error.
            # We will ignore additional pallets in this same transition after first valid one.
            break

        # Decide next phase
        if got_pallet_for_assignment:
            self.hold_in("SEND_ASSIGNMENT", 0.0)
            return

        # If we are not emitting an assignment now, try to start a dequeue request (assignment loop step)
        if self._maybe_start_dequeue_request():
            self.hold_in("SEND_DEQUEUE_REQ", 0.0)
            return

        # Otherwise, remain passive
        self.hold_in("IDLE", self.param["passive_sigma"])`,
            lambdaf: `    def lambdaf(self):
        # Output only; no state changes here.
        if self.phase == "SEND_DEQUEUE_REQ":
            if isinstance(self._out_dequeue_req, dict):
                self.output["dequeue_req_out"].add(self._out_dequeue_req)
        elif self.phase == "SEND_ASSIGNMENT":
            if isinstance(self._out_assignment, dict):
                self.output["assignment_out"].add(self._out_assignment)`,
            deltint: `    def deltint(self):
        # Internal transition after outputs have been emitted.
        if self.phase == "SEND_DEQUEUE_REQ":
            self._out_dequeue_req = None
            # Wait for pallet_in (response)
            self.hold_in("IDLE", self.param["passive_sigma"])
            return

        if self.phase == "SEND_ASSIGNMENT":
            self._out_assignment = None
            # Continue loop: request next pallet if possible
            if self._maybe_start_dequeue_request():
                self.hold_in("SEND_DEQUEUE_REQ", 0.0)
            else:
                self.hold_in("IDLE", self.param["passive_sigma"])
            return

        # IDLE (passive): remain passive
        self.hold_in("IDLE", self.param["passive_sigma"])`,
            exit: `    def exit(self):
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "model_exit",
                "payload": {
                    "total_assignments": int(self.total_assignments),
                    "final_queue_size": int(self.queue_size),
                    "known_idle_aircraft": int(len(self.idle_aircraft_ids)),
                    "request_in_flight": bool(self.request_in_flight),
                },
            },
            log_type="RESULT",
        )`,
          },
        },
        {
          id: 'n6',
          label: 'AircraftFleet (coupled)',
          modelType: 'coupled',
          x: 760,
          y: 130,
          ports: { in: ['assignment_in'], out: ['aircraft_idle_out', 'delivery_out'] },
          portsTyped: {
            in: [{ name: 'assignment_in', type: 'dict' }],
            out: [
              { name: 'aircraft_idle_out', type: 'dict' },
              { name: 'delivery_out', type: 'dict' },
            ],
          },
          file: 'StrategicAirlift_D0_libs/AircraftFleet.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        num_aircraft: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): The parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft in the fleet (>=1). Aircraft IDs are 1..num_aircraft.
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for aircraft to fly destination -> facility.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param: dict = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftFleet"
        }

        # Normalize configuration
        num_aircraft_n: int = int(num_aircraft)
        flight_time_n: float = float(flight_time)
        unload_time_n: float = float(unload_time)
        return_time_n: float = float(return_time)
        maintenance_time_n: float = float(maintenance_time)

        # Define boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "aircraft_idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Instantiate event mux (seeds initial idle and forwards events)
        event_mux = FleetEventMux(
            name="event_mux",
            parent=self,
            num_aircraft=num_aircraft_n,
        )
        self.add_component(event_mux)

        # Instantiate aircraft units and couple
        aircraft_units: list[AircraftUnit] = []
        for aircraft_id in range(1, num_aircraft_n + 1):
            unit = AircraftUnit(
                name=f"aircraft_{aircraft_id}",
                parent=self,
                aircraft_id=int(aircraft_id),
                flight_time=flight_time_n,
                unload_time=unload_time_n,
                return_time=return_time_n,
                maintenance_time=maintenance_time_n,
            )
            self.add_component(unit)
            aircraft_units.append(unit)

            # EIC: broadcast assignments to each aircraft unit
            self.add_coupling(self.input["assignment_in"], unit.input["assignment_in"])

            # IC: per-aircraft events to mux inputs
            self.add_coupling(unit.output["idle_out"], event_mux.input["aircraft_idle_in"])
            self.add_coupling(unit.output["delivery_out"], event_mux.input["delivery_in"])

        # EOC: mux outputs to fleet outputs
        self.add_coupling(event_mux.output["aircraft_idle_out"], self.output["aircraft_idle_out"])
        self.add_coupling(event_mux.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftFleet",
                "num_aircraft": num_aircraft_n,
                "timings": {
                    "flight_time": flight_time_n,
                    "unload_time": unload_time_n,
                    "return_time": return_time_n,
                    "maintenance_time": maintenance_time_n,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`,
          },
        },
        {
          id: 'n7',
          label: 'FleetEventMux',
          modelType: 'atomic',
          x: 760,
          y: 255,
          ports: { in: ['aircraft_idle_in', 'delivery_in'], out: ['aircraft_idle_out', 'delivery_out'] },
          portsTyped: {
            in: [
              { name: 'aircraft_idle_in', type: 'dict' },
              { name: 'delivery_in', type: 'dict' },
            ],
            out: [
              { name: 'aircraft_idle_out', type: 'dict' },
              { name: 'delivery_out', type: 'dict' },
            ],
          },
          file: 'StrategicAirlift_D0_libs/AircraftFleet_libs/FleetEventMux.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, num_aircraft: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft (>=1). Used only to emit initial IDLE notifications for aircraft IDs
                1..num_aircraft at T=0.0.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "aircraft_idle_in"))
        self.add_in_port(Port(dict, "delivery_in"))
        self.add_out_port(Port(dict, "aircraft_idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Internal hardcoded parameters
        self.param = {
            "phase_seed": "SEED",
            "phase_forward": "FORWARD",
            "phase_passive": "PASSIVE",
        }

        # Config
        self.num_aircraft = int(num_aircraft)

        # Internal buffers (prepared in initialize/deltint/deltext; emitted in lambdaf)
        self._seed_msgs: list[dict] = []
        self._idle_buf: list[dict] = []
        self._delivery_buf: list[dict] = []

        self._seed_done: bool = False`,
            initialize: `    def initialize(self):
        self._idle_buf = []
        self._delivery_buf = []

        n = self.num_aircraft if self.num_aircraft > 0 else 0
        self._seed_msgs = [{"aircraft_id": int(i)} for i in range(1, n + 1)]
        self._seed_done = False

        # Schedule seeding output at T=0.0
        self.hold_in(self.param["phase_seed"], 0.0)`,
            lambdaf: `    def lambdaf(self):
        # Output only; no state changes here
        if self.phase == self.param["phase_seed"]:
            for msg in self._seed_msgs:
                self.output["aircraft_idle_out"].add(msg)

        elif self.phase == self.param["phase_forward"]:
            for msg in self._idle_buf:
                self.output["aircraft_idle_out"].add(msg)
            for msg in self._delivery_buf:
                self.output["delivery_out"].add(msg)`,
            deltint: `    def deltint(self):
        # Internal transition occurs immediately after lambdaf (output already emitted)
        if self.phase == self.param["phase_seed"]:
            self._seed_done = True
            self._seed_msgs = []

            if self._idle_buf or self._delivery_buf:
                self.hold_in(self.param["phase_forward"], 0.0)
            else:
                self.hold_in(self.param["phase_passive"], float("inf"))
            return

        if self.phase == self.param["phase_forward"]:
            # Clear forwarded buffers after emission
            self._idle_buf = []
            self._delivery_buf = []
            self.hold_in(self.param["phase_passive"], float("inf"))
            return

        # PASSIVE should not timeout, but keep it safe
        self.hold_in(self.param["phase_passive"], float("inf"))`,
            deltext: `    def deltext(self, e: float):
        # External transition: buffer inputs; schedule immediate forwarding if appropriate.
        # NOTE: Must not override SEED at T=0.0 (seeding must happen).
        has_any = False

        for msg in self.input["aircraft_idle_in"].values:
            # Expected structure: {"aircraft_id": int}
            if isinstance(msg, dict):
                self._idle_buf.append(msg)
                has_any = True

        for msg in self.input["delivery_in"].values:
            # Expected structure: {"pallet_id": int, "aircraft_id": int, "latency": float}
            if isinstance(msg, dict):
                self._delivery_buf.append(msg)
                has_any = True

        if not has_any:
            # No new information: just reduce remaining time (if any)
            remaining = self.ta()
            if remaining != float("inf"):
                remaining = max(0.0, remaining - float(e))
            self.hold_in(self.phase, remaining)
            return

        # If we are still in SEED (e.g., confluent at t=0), do not preempt seeding.
        if (not self._seed_done) and self.phase == self.param["phase_seed"]:
            remaining = self.ta()
            remaining = max(0.0, remaining - float(e))
            self.hold_in(self.param["phase_seed"], remaining)
            return

        # Otherwise, forward immediately at the same simulation time
        self.hold_in(self.param["phase_forward"], 0.0)`,
            exit: `    def exit(self):
        # No additional logging or results required by specification.
        pass`,
          },
        },
        {
          id: 'n8',
          label: 'AircraftUnit aircraft_1 (coupled)',
          modelType: 'coupled',
          x: 560,
          y: 255,
          ports: { in: ['assignment_in'], out: ['idle_out', 'delivery_out'] },
          portsTyped: {
            in: [{ name: 'assignment_in', type: 'dict' }],
            out: [
              { name: 'idle_out', type: 'dict' },
              { name: 'delivery_out', type: 'dict' },
            ],
          },
          file: 'StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit's aircraft identifier.
            flight_time (float): Seconds for facility -> destination flight.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for destination -> facility return flight.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Normalize/cast configuration (primitives only)
        aircraft_id_i = int(aircraft_id)
        flight_time_f = float(flight_time)
        unload_time_f = float(unload_time)
        return_time_f = float(return_time)
        maintenance_time_f = float(maintenance_time)

        # Sub-components
        aircraft_mission = AircraftMissionController(
            name="aircraft_mission",
            parent=self,
            aircraft_id=aircraft_id_i,
            flight_time=flight_time_f,
            unload_time=unload_time_f,
            return_time=return_time_f,
        )
        aircraft_maintenance = AircraftMaintenanceController(
            name="aircraft_maintenance",
            parent=self,
            aircraft_id=aircraft_id_i,
            maintenance_time=maintenance_time_f,
        )

        self.add_component(aircraft_mission)
        self.add_component(aircraft_maintenance)

        # Couplings
        # EIC: external -> internal
        self.add_coupling(self.input["assignment_in"], aircraft_mission.input["assignment_in"])

        # IC: internal -> internal
        self.add_coupling(
            aircraft_mission.output["maintenance_start_out"],
            aircraft_maintenance.input["maintenance_start_in"],
        )
        self.add_coupling(
            aircraft_maintenance.output["maintenance_done_out"],
            aircraft_mission.input["maintenance_done_in"],
        )

        # EOC: internal -> external
        self.add_coupling(aircraft_maintenance.output["idle_out"], self.output["idle_out"])
        self.add_coupling(aircraft_mission.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftUnit",
                "aircraft_id": aircraft_id_i,
                "timings": {
                    "flight_time": flight_time_f,
                    "unload_time": unload_time_f,
                    "return_time": return_time_f,
                    "maintenance_time": maintenance_time_f,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`,
          },
        },
        {
          id: 'n9',
          label: 'AircraftUnit aircraft_2 (coupled)',
          modelType: 'coupled',
          x: 950,
          y: 255,
          ports: { in: ['assignment_in'], out: ['idle_out', 'delivery_out'] },
          portsTyped: {
            in: [{ name: 'assignment_in', type: 'dict' }],
            out: [
              { name: 'idle_out', type: 'dict' },
              { name: 'delivery_out', type: 'dict' },
            ],
          },
          file: 'StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit's aircraft identifier.
            flight_time (float): Seconds for facility -> destination flight.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for destination -> facility return flight.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Normalize/cast configuration (primitives only)
        aircraft_id_i = int(aircraft_id)
        flight_time_f = float(flight_time)
        unload_time_f = float(unload_time)
        return_time_f = float(return_time)
        maintenance_time_f = float(maintenance_time)

        # Sub-components
        aircraft_mission = AircraftMissionController(
            name="aircraft_mission",
            parent=self,
            aircraft_id=aircraft_id_i,
            flight_time=flight_time_f,
            unload_time=unload_time_f,
            return_time=return_time_f,
        )
        aircraft_maintenance = AircraftMaintenanceController(
            name="aircraft_maintenance",
            parent=self,
            aircraft_id=aircraft_id_i,
            maintenance_time=maintenance_time_f,
        )

        self.add_component(aircraft_mission)
        self.add_component(aircraft_maintenance)

        # Couplings
        # EIC: external -> internal
        self.add_coupling(self.input["assignment_in"], aircraft_mission.input["assignment_in"])

        # IC: internal -> internal
        self.add_coupling(
            aircraft_mission.output["maintenance_start_out"],
            aircraft_maintenance.input["maintenance_start_in"],
        )
        self.add_coupling(
            aircraft_maintenance.output["maintenance_done_out"],
            aircraft_mission.input["maintenance_done_in"],
        )

        # EOC: internal -> external
        self.add_coupling(aircraft_maintenance.output["idle_out"], self.output["idle_out"])
        self.add_coupling(aircraft_mission.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftUnit",
                "aircraft_id": aircraft_id_i,
                "timings": {
                    "flight_time": flight_time_f,
                    "unload_time": unload_time_f,
                    "return_time": return_time_f,
                    "maintenance_time": maintenance_time_f,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`,
          },
        },
        {
          id: 'n10',
          label: 'AircraftUnit aircraft_3...N (omitted)',
          modelType: 'coupled',
          x: 1165,
          y: 255,
          ports: { in: ['assignment_in'], out: ['idle_out', 'delivery_out'] },
          portsTyped: {
            in: [{ name: 'assignment_in', type: 'dict' }],
            out: [
              { name: 'idle_out', type: 'dict' },
              { name: 'delivery_out', type: 'dict' },
            ],
          },
          file: 'StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit's aircraft identifier.
            flight_time (float): Seconds for facility -> destination flight.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for destination -> facility return flight.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Normalize/cast configuration (primitives only)
        aircraft_id_i = int(aircraft_id)
        flight_time_f = float(flight_time)
        unload_time_f = float(unload_time)
        return_time_f = float(return_time)
        maintenance_time_f = float(maintenance_time)

        # Sub-components
        aircraft_mission = AircraftMissionController(
            name="aircraft_mission",
            parent=self,
            aircraft_id=aircraft_id_i,
            flight_time=flight_time_f,
            unload_time=unload_time_f,
            return_time=return_time_f,
        )
        aircraft_maintenance = AircraftMaintenanceController(
            name="aircraft_maintenance",
            parent=self,
            aircraft_id=aircraft_id_i,
            maintenance_time=maintenance_time_f,
        )

        self.add_component(aircraft_mission)
        self.add_component(aircraft_maintenance)

        # Couplings
        # EIC: external -> internal
        self.add_coupling(self.input["assignment_in"], aircraft_mission.input["assignment_in"])

        # IC: internal -> internal
        self.add_coupling(
            aircraft_mission.output["maintenance_start_out"],
            aircraft_maintenance.input["maintenance_start_in"],
        )
        self.add_coupling(
            aircraft_maintenance.output["maintenance_done_out"],
            aircraft_mission.input["maintenance_done_in"],
        )

        # EOC: internal -> external
        self.add_coupling(aircraft_maintenance.output["idle_out"], self.output["idle_out"])
        self.add_coupling(aircraft_mission.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftUnit",
                "aircraft_id": aircraft_id_i,
                "timings": {
                    "flight_time": flight_time_f,
                    "unload_time": unload_time_f,
                    "return_time": return_time_f,
                    "maintenance_time": maintenance_time_f,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`,
          },
        },
        {
          id: 'n11',
          label: 'A1 AircraftMissionController (coupled)',
          modelType: 'coupled',
          x: 560,
          y: 370,
          ports: { in: ['assignment_in', 'maintenance_done_in'], out: ['delivery_out', 'maintenance_start_out'] },
          portsTyped: {
            in: [
              { name: 'assignment_in', type: 'dict' },
              { name: 'maintenance_done_in', type: 'dict' },
            ],
            out: [
              { name: 'delivery_out', type: 'dict' },
              { name: 'maintenance_start_out', type: 'dict' },
            ],
          },
          file:
            'StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMissionController.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): The parent model. If None, the model is a root model.
            aircraft_id (int): This unit’s aircraft ID (1..num_aircraft).
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination; delivery recorded at end of this interval.
            return_time (float): Seconds for aircraft to fly destination -> facility.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit.AircraftMissionController",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_in_port(Port(dict, "maintenance_done_in"))

        self.add_out_port(Port(dict, "delivery_out"))
        self.add_out_port(Port(dict, "maintenance_start_out"))

        # Sub-models
        mission_sm = MissionStateMachine(
            name="mission_sm",
            parent=self,
            aircraft_id=int(aircraft_id),
            flight_time=float(flight_time),
            unload_time=float(unload_time),
            return_time=float(return_time),
        )
        mission_log_emitter = MissionLogEmitter(
            name="mission_log_emitter",
            parent=self,
        )

        self.add_component(mission_sm)
        self.add_component(mission_log_emitter)

        # Couplings
        # EIC: inputs to mission state machine
        self.add_coupling(self.input["assignment_in"], mission_sm.input["assignment_in"])
        self.add_coupling(self.input["maintenance_done_in"], mission_sm.input["maintenance_done_in"])

        # IC: mission logs to logger-emitter
        self.add_coupling(mission_sm.output["log_out"], mission_log_emitter.input["log_in"])

        # EOC: outputs from mission state machine
        self.add_coupling(mission_sm.output["delivery_out"], self.output["delivery_out"])
        self.add_coupling(mission_sm.output["maintenance_start_out"], self.output["maintenance_start_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftMissionController",
                "aircraft_id": int(aircraft_id),
                "timings": {
                    "flight_time": float(flight_time),
                    "unload_time": float(unload_time),
                    "return_time": float(return_time),
                },
                "params": self.param,
            },
            log_type="PROCESS",
        )`,
          },
        },
        {
          id: 'n12',
          label: 'A1 MissionStateMachine',
          modelType: 'atomic',
          x: 500,
          y: 470,
          ports: { in: ['assignment_in', 'maintenance_done_in'], out: ['delivery_out', 'maintenance_start_out', 'log_out'] },
          portsTyped: {
            in: [
              { name: 'assignment_in', type: 'dict' },
              { name: 'maintenance_done_in', type: 'dict' },
            ],
            out: [
              { name: 'delivery_out', type: 'dict' },
              { name: 'maintenance_start_out', type: 'dict' },
              { name: 'log_out', type: 'dict' },
            ],
          },
          file:
            'StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMissionController_libs/MissionStateMachine.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model (e.g., 'aircraft_1_mission_sm').
            parent (Coupled | None): The parent model. If None, the model is a root model.
            aircraft_id (int): This unit’s aircraft ID (1..num_aircraft).
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination; delivery recorded at end of this interval.
            return_time (float): Seconds for aircraft to fly destination -> facility.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_in_port(Port(dict, "maintenance_done_in"))
        self.add_out_port(Port(dict, "delivery_out"))
        self.add_out_port(Port(dict, "maintenance_start_out"))
        self.add_out_port(Port(dict, "log_out"))

        # Configuration
        self.aircraft_id = int(aircraft_id)
        self.flight_time = float(flight_time)
        self.unload_time = float(unload_time)
        self.return_time = float(return_time)

        # Mission-related state (per spec)
        self.current_pallet = None  # None | {'pallet_id': int, 'gen_time': float}
        self.next_phase_time = None  # float | None (absolute)

        # Internal control flags / pending outputs (prepared before lambdaf)
        self._waiting_for_maintenance = False

        self._emit_depart_now = False
        self._pending_depart_log = None  # dict | None

        self._pending_delivery = None  # dict | None

        self._pending_return_logs = []  # list[dict]
        self._pending_maintenance_start = None  # dict | None

        # Initial DEVS state (finalized in initialize)
        self.hold_in("IDLE", float("inf"))`,
            initialize: `    def initialize(self):
        # Initial mission state (per spec)
        self.current_pallet = None
        self.next_phase_time = None

        self._waiting_for_maintenance = False

        self._emit_depart_now = False
        self._pending_depart_log = None

        self._pending_delivery = None

        self._pending_return_logs = []
        self._pending_maintenance_start = None

        self.hold_in("IDLE", float("inf"))`,
            _make_log_record: `    def _make_log_record(self, event: str, payload: dict) -> dict:
        """
        Args:
            event (str): One of {'depart','return','maintenance_start'}.
            payload (dict): Event payload, must be JSON-serializable and composed only of atomic primitives/dict/list.
                (for 'depart') aircraft_id (int), pallet_id (int)
                (for 'return') aircraft_id (int)
                (for 'maintenance_start') aircraft_id (int)

        Returns:
            (dict): Log record with keys: time (float), entity (str), event (str), payload (dict)
        """
        return {
            "time": float(get_current_time()),
            "entity": "aircraft",
            "event": str(event),
            "payload": payload,
        }`,
            lambdaf: `    def lambdaf(self):
        # Output only. Do not mutate state here.
        if self.phase == "FLYING" and self._emit_depart_now and self._pending_depart_log is not None:
            self.output["log_out"].add(self._pending_depart_log)

        if self.phase == "UNLOADING" and self._pending_delivery is not None:
            self.output["delivery_out"].add(self._pending_delivery)

        if self.phase == "RETURNING":
            # RETURNING completion outputs
            if self._pending_return_logs:
                for rec in self._pending_return_logs:
                    self.output["log_out"].add(rec)
            if self._pending_maintenance_start is not None:
                self.output["maintenance_start_out"].add(self._pending_maintenance_start)`,
            deltint: `    def deltint(self):
        old_phase = self.phase
        _old_ta = self.ta()
        now = float(get_current_time())

        if old_phase == "IDLE":
            # No internal events should happen in IDLE (sigma=inf), but keep safe.
            self.hold_in("IDLE", float("inf"))
            return

        if old_phase == "FLYING":
            # Two cases:
            #   (A) Immediate 'depart' emission (sigma=0) when starting flight
            #   (B) Flight completion (sigma=flight_time)
            if self._emit_depart_now:
                # (A) depart has been emitted in lambdaf; now schedule actual flight completion
                self._emit_depart_now = False
                self._pending_depart_log = None

                # next_phase_time was already set at assignment acceptance
                if self.next_phase_time is None:
                    # Defensive fallback: schedule with configured flight_time
                    self.next_phase_time = now + self.flight_time

                remaining = max(0.0, float(self.next_phase_time) - now)
                self.hold_in("FLYING", remaining)
                return

            # (B) Flight completed: transition to UNLOADING and prepare delivery payload for UNLOADING completion
            self.phase = "UNLOADING"
            self.next_phase_time = now + self.unload_time

            if self.current_pallet is not None:
                pallet_id = int(self.current_pallet["pallet_id"])
                gen_time = float(self.current_pallet["gen_time"])
                delivery_time = now + self.unload_time
                latency = float(delivery_time - gen_time)
                self._pending_delivery = {
                    "pallet_id": pallet_id,
                    "aircraft_id": int(self.aircraft_id),
                    "latency": latency,
                }
            else:
                # Should not happen, but keep schema-safe
                self._pending_delivery = None

            self.hold_in("UNLOADING", max(0.0, self.unload_time))
            return

        if old_phase == "UNLOADING":
            # Delivery has been emitted in lambdaf; now transition to RETURNING and prepare RETURNING completion outputs.
            self._pending_delivery = None

            self.phase = "RETURNING"
            self.next_phase_time = now + self.return_time

            # Prepare RETURNING completion outputs (to be emitted at end of RETURNING)
            self._pending_return_logs = [
                self._make_log_record("return", {"aircraft_id": int(self.aircraft_id)}),
                self._make_log_record("maintenance_start", {"aircraft_id": int(self.aircraft_id)}),
            ]
            self._pending_maintenance_start = {"aircraft_id": int(self.aircraft_id)}

            self.hold_in("RETURNING", max(0.0, self.return_time))
            return

        if old_phase == "RETURNING":
            # RETURNING completion outputs have been emitted in lambdaf; now park and wait for maintenance_done_in.
            self._pending_return_logs = []
            self._pending_maintenance_start = None

            # Clear/park mission timing; wait for maintenance completion
            self.next_phase_time = None
            self._waiting_for_maintenance = True

            # current_pallet is no longer needed after mission completion
            self.current_pallet = None

            # Keep phase within allowed set; park indefinitely (await external)
            self.hold_in("RETURNING", float("inf"))
            return

        # Defensive fallback
        self.hold_in(old_phase, float("inf"))`,
            deltext: `    def deltext(self, e: float):
        _ = float(e)
        now = float(get_current_time())
        phase_before = self.phase
        sigma_before = self.ta()

        accepted_assignment = False
        maintenance_done = False

        # Process assignment(s)
        for msg in self.input["assignment_in"].values:
            # msg (dict):
            #   aircraft_id (int)
            #   pallet (dict): pallet_id (int), gen_time (float)
            if accepted_assignment:
                continue

            try:
                msg_aircraft_id = int(msg.get("aircraft_id"))
            except Exception:
                continue

            if msg_aircraft_id != int(self.aircraft_id):
                continue

            # Accept only if currently IDLE (per spec)
            if self.phase != "IDLE":
                continue

            pallet = msg.get("pallet", None)
            if not isinstance(pallet, dict):
                continue

            if "pallet_id" not in pallet or "gen_time" not in pallet:
                continue

            pallet_id = int(pallet["pallet_id"])
            gen_time = float(pallet["gen_time"])

            # Accept assignment
            self.current_pallet = {"pallet_id": pallet_id, "gen_time": gen_time}
            self.next_phase_time = now + self.flight_time

            # Prepare immediate depart log via a zero-time internal event in FLYING
            self._pending_depart_log = self._make_log_record(
                "depart",
                {"aircraft_id": int(self.aircraft_id), "pallet_id": pallet_id},
            )
            self._emit_depart_now = True

            # Start FLYING phase; schedule immediate output at same timestamp
            self._waiting_for_maintenance = False
            self.hold_in("FLYING", 0.0)
            accepted_assignment = True

        # Process maintenance completion(s)
        for msg in self.input["maintenance_done_in"].values:
            # msg (dict): {'aircraft_id': int}
            try:
                msg_aircraft_id = int(msg.get("aircraft_id"))
            except Exception:
                continue

            if msg_aircraft_id != int(self.aircraft_id):
                continue

            # Only act when actually waiting for maintenance completion
            if not self._waiting_for_maintenance:
                continue

            # Reset to IDLE
            self.current_pallet = None
            self.next_phase_time = None
            self._waiting_for_maintenance = False

            # Clear any pending outputs just in case
            self._emit_depart_now = False
            self._pending_depart_log = None
            self._pending_delivery = None
            self._pending_return_logs = []
            self._pending_maintenance_start = None

            self.hold_in("IDLE", float("inf"))
            maintenance_done = True

        # If no state change occurred due to external events, preserve timing (deduct elapsed time)
        if not accepted_assignment and not maintenance_done:
            if sigma_before == float("inf"):
                self.hold_in(phase_before, float("inf"))
            else:
                self.hold_in(phase_before, max(0.0, float(sigma_before) - float(e)))`,
            exit: `    def exit(self):
        # Cleanup only; no mission-event logs here (mission logs are emitted via log_out during simulation).
        self.current_pallet = None
        self.next_phase_time = None
        self._waiting_for_maintenance = False

        self._emit_depart_now = False
        self._pending_depart_log = None
        self._pending_delivery = None
        self._pending_return_logs = []
        self._pending_maintenance_start = None`,
          },
        },
        {
          id: 'n13',
          label: 'A1 MissionLogEmitter',
          modelType: 'atomic',
          x: 670,
          y: 470,
          ports: { in: ['log_in'], out: [] },
          portsTyped: {
            in: [{ name: 'log_in', type: 'dict' }],
            out: [],
          },
          file:
            'StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMissionController_libs/MissionLogEmitter.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): The parent model. If None, the model is a root model.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "log_in"))

        # Internal hardcoded parameters (none required, keep explicit container per standard)
        self.param: dict = {}

        # No buffered records by design (immediate forwarding)
        self.hold_in("IDLE", float("inf"))`,
            initialize: `    def initialize(self):
        # Ready/idle; no buffered records.
        self.hold_in("IDLE", float("inf"))`,
            _validate_record: `    def _validate_record(self, record: dict):
        if not isinstance(record, dict):
            raise TypeError("MissionLogEmitter.log_in record must be a dict")

        expected_keys = {"time", "entity", "event", "payload"}
        record_keys = set(record.keys())
        if record_keys != expected_keys:
            raise ValueError(f"MissionLogEmitter.log_in record keys must be exactly {expected_keys}, got {record_keys}")

        if not isinstance(record["time"], float):
            raise TypeError("MissionLogEmitter.log_in['time'] must be a float")
        if not isinstance(record["entity"], str):
            raise TypeError("MissionLogEmitter.log_in['entity'] must be a str")
        if not isinstance(record["event"], str):
            raise TypeError("MissionLogEmitter.log_in['event'] must be a str")
        if not isinstance(record["payload"], dict):
            raise TypeError("MissionLogEmitter.log_in['payload'] must be a dict")

        event_name = record["event"]
        payload = record["payload"]

        if event_name == "depart":
            payload_keys = set(payload.keys())
            if payload_keys != {"aircraft_id", "pallet_id"}:
                raise ValueError("depart payload must have exactly keys {'aircraft_id','pallet_id'}")
            if not isinstance(payload["aircraft_id"], int):
                raise TypeError("depart payload['aircraft_id'] must be an int")
            if not isinstance(payload["pallet_id"], int):
                raise TypeError("depart payload['pallet_id'] must be an int")
        elif event_name in {"return", "maintenance_start"}:
            payload_keys = set(payload.keys())
            if payload_keys != {"aircraft_id"}:
                raise ValueError(f"{event_name} payload must have exactly key {{'aircraft_id'}}")
            if not isinstance(payload["aircraft_id"], int):
                raise TypeError(f"{event_name} payload['aircraft_id'] must be an int")
        else:
            # Preserve schema; only validate the required mission events explicitly described by spec.
            # Other events (if any) must still adhere to the top-level record schema above.
            pass`,
            deltext: `    def deltext(self, e: float):
        _ = e
        for record in self.input["log_in"].values:
            self._validate_record(record)
            # Forward unchanged record (no extra keys added here).
            self.logger.info(record, log_type="PROCESS")

        # Avoid re-processing if the runtime does not auto-clear the port.
        self.input["log_in"].clear()

        self.hold_in("IDLE", float("inf"))`,
            lambdaf: `    def lambdaf(self):
        # No output ports. (All forwarding is done via logger side-effect in deltext.)
        return`,
            deltint: `    def deltint(self):
        # No internal events expected.
        self.hold_in("IDLE", float("inf"))`,
            exit: `    def exit(self):
        # No additional logs here to avoid introducing non-spec JSONL lines.
        _ = get_current_time()
        return`,
          },
        },
        {
          id: 'n14',
          label: 'A1 MaintenanceController',
          modelType: 'atomic',
          x: 760,
          y: 370,
          ports: { in: ['maintenance_start_in'], out: ['idle_out', 'maintenance_done_out'] },
          portsTyped: {
            in: [{ name: 'maintenance_start_in', type: 'dict' }],
            out: [
              { name: 'idle_out', type: 'dict' },
              { name: 'maintenance_done_out', type: 'dict' },
            ],
          },
          file:
            'StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMaintenanceController.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, aircraft_id: int, maintenance_time: float):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit’s aircraft ID (1..num_aircraft).
            maintenance_time (float): Seconds aircraft spends in maintenance after returning; aircraft becomes IDLE at end.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "maintenance_start_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "maintenance_done_out"))

        # Configuration
        self.aircraft_id = int(aircraft_id)
        self.maintenance_time = float(maintenance_time)

        # Internal hardcoded parameters
        self.param = {
            "passive_sigma": float("inf")
        }

        # State variables
        self.next_phase_time = None  # float | None
        self._pending_idle_payload = None  # dict | None
        self._pending_maintenance_done_payload = None  # dict | None
        self.maintenance_completed = 0  # KPI counter

        # Initial scheduling (no initial output)
        self.hold_in("IDLE", self.param["passive_sigma"])

        # Log creation (schema must be exactly time/entity/event/payload)
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "aircraft",
                "event": "model_created",
                "payload": {
                    "aircraft_id": int(self.aircraft_id),
                    "maintenance_time": float(self.maintenance_time),
                },
            },
            log_type="PROCESS",
        )`,
            initialize: `    def initialize(self):
        self.next_phase_time = None
        self._pending_idle_payload = None
        self._pending_maintenance_done_payload = None
        self.maintenance_completed = 0

        self.hold_in("IDLE", self.param["passive_sigma"])

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "aircraft",
                "event": "model_initialized",
                "payload": {
                    "aircraft_id": int(self.aircraft_id),
                    "phase": "IDLE",
                },
            },
            log_type="PROCESS",
        )`,
            deltext: `    def deltext(self, e: float):
        # External transition: handle maintenance start triggers.
        current_time = float(get_current_time())

        # Default: continue current phase with remaining time unless changed by an accepted trigger.
        remaining = self.ta()
        if math.isinf(remaining):
            remaining_after_e = remaining
        else:
            remaining_after_e = max(0.0, float(remaining) - float(e))

        started = False

        for msg in self.input["maintenance_start_in"].values:
            # msg schema:
            #   aircraft_id (int): target aircraft id
            if not isinstance(msg, dict):
                continue
            if "aircraft_id" not in msg:
                continue

            msg_aircraft_id = msg["aircraft_id"]
            if isinstance(msg_aircraft_id, bool):
                continue
            if not isinstance(msg_aircraft_id, int):
                continue

            if int(msg_aircraft_id) != int(self.aircraft_id):
                continue

            # Accept trigger only if not already in MAINTENANCE (deterministic, no stacking).
            if self.phase != "MAINTENANCE":
                started = True
                self.next_phase_time = current_time + float(self.maintenance_time)
                self._pending_idle_payload = {"aircraft_id": int(self.aircraft_id)}
                self._pending_maintenance_done_payload = {"aircraft_id": int(self.aircraft_id)}
                self.hold_in("MAINTENANCE", max(0.0, float(self.maintenance_time)))
            # If already in MAINTENANCE, ignore additional triggers deterministically.

        if not started:
            self.hold_in(self.phase, remaining_after_e)`,
            lambdaf: `    def lambdaf(self):
        # Output function: output only, no state changes.
        if self.phase == "MAINTENANCE":
            if isinstance(self._pending_idle_payload, dict):
                self.output["idle_out"].add(self._pending_idle_payload)
            if isinstance(self._pending_maintenance_done_payload, dict):
                self.output["maintenance_done_out"].add(self._pending_maintenance_done_payload)`,
            deltint: `    def deltint(self):
        # Internal transition: handle maintenance completion.
        current_time = float(get_current_time())

        if self.phase == "MAINTENANCE":
            # Maintenance completes now (time == next_phase_time by construction).
            self.maintenance_completed += 1

            # Required event log: maintenance_end
            self.logger.info(
                {
                    "time": float(current_time),
                    "entity": "aircraft",
                    "event": "maintenance_end",
                    "payload": {
                        "aircraft_id": int(self.aircraft_id),
                    },
                },
                log_type="PROCESS",
            )

            # Transition to IDLE
            self.next_phase_time = None
            self._pending_idle_payload = None
            self._pending_maintenance_done_payload = None
            self.hold_in("IDLE", self.param["passive_sigma"])
        else:
            # IDLE has no scheduled internal events; keep passive.
            self.hold_in("IDLE", self.param["passive_sigma"])`,
            exit: `    def exit(self):
        # Final stats logging
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "aircraft",
                "event": "model_finalized",
                "payload": {
                    "aircraft_id": int(self.aircraft_id),
                    "maintenance_completed": int(self.maintenance_completed),
                },
            },
            log_type="RESULT",
        )`,
          },
        },
        {
          id: 'n15',
          label: 'DestinationSink',
          modelType: 'atomic',
          x: 1290,
          y: 130,
          ports: { in: ['delivery_in'], out: [] },
          portsTyped: { in: [{ name: 'delivery_in', type: 'dict' }], out: [] },
          file: 'StrategicAirlift_D0_libs/DestinationSink.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "delivery_in"))

        # Internal hardcoded parameters (none required, but reserved for consistency)
        self.param = {}

        # Internal state
        self.total_delivered = 0  # (int) cumulative deliveries recorded

        # Initial DEVS state (will be set again in initialize())
        self.hold_in("IDLE", float("inf"))

        # Log creation (must conform to the required {time, entity, event, payload} schema)
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "destination",
                "event": "model_created",
                "payload": {"model_name": str(self.name)},
            },
            log_type="PROCESS",
        )`,
            initialize: `    def initialize(self):
        self.total_delivered = 0
        self.hold_in("IDLE", float("inf"))

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "destination",
                "event": "model_initialized",
                "payload": {"model_name": str(self.name)},
            },
            log_type="PROCESS",
        )`,
            deltext: `    def deltext(self, e: float):
        _ = e  # elapsed time is not needed for this sink
        t_now = float(get_current_time())

        for delivery in self.input["delivery_in"].values:
            # Expected structure (dict):
            #   pallet_id (int), aircraft_id (int), latency (float)
            payload = {
                "pallet_id": int(delivery["pallet_id"]),
                "aircraft_id": int(delivery["aircraft_id"]),
                "latency": float(delivery["latency"]),
            }

            self.total_delivered += 1
            self.logger.info(
                {
                    "time": t_now,
                    "entity": "destination",
                    "event": "pallet_delivered",
                    "payload": payload,
                },
                log_type="RESULT",
            )

        # Remain idle indefinitely
        self.hold_in("IDLE", float("inf"))`,
            lambdaf: `    def lambdaf(self):
        # No external outputs required by specification.
        return`,
            deltint: `    def deltint(self):
        # No internal events; remain idle.
        self.hold_in("IDLE", float("inf"))`,
            exit: `    def exit(self):
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "destination",
                "event": "model_finalized",
                "payload": {"model_name": str(self.name), "total_delivered": int(self.total_delivered)},
            },
            log_type="RESULT",
        )`,
          },
        },
      ],
      edges: [
        ['n1', 'n2', 'contains'],
        ['n1', 'n3', 'contains'],
        ['n1', 'n6', 'contains'],
        ['n1', 'n15', 'contains'],

        ['n2', 'n3', 'IC: pallet_out -> pallet_in'],
        ['n3', 'n6', 'IC: assignment_out -> assignment_in'],
        ['n6', 'n3', 'IC: aircraft_idle_out -> aircraft_idle_in'],
        ['n6', 'n15', 'IC: delivery_out -> delivery_in'],

        ['n3', 'n4', 'EIC: pallet_in'],
        ['n3', 'n5', 'EIC: aircraft_idle_in'],
        ['n5', 'n4', 'IC: dequeue_req_out -> dequeue_req_in'],
        ['n4', 'n5', 'IC: pallet_out -> pallet_in'],
        ['n4', 'n5', 'IC: queue_status_out -> queue_status_in'],
        ['n5', 'n3', 'EOC: assignment_out'],

        ['n6', 'n8', 'EIC broadcast: assignment_in'],
        ['n6', 'n9', 'EIC broadcast: assignment_in'],
        ['n6', 'n10', 'EIC broadcast: assignment_in'],
        ['n8', 'n7', 'IC: idle_out -> aircraft_idle_in'],
        ['n8', 'n7', 'IC: delivery_out -> delivery_in'],
        ['n9', 'n7', 'IC: idle_out -> aircraft_idle_in'],
        ['n9', 'n7', 'IC: delivery_out -> delivery_in'],
        ['n10', 'n7', 'IC: idle_out -> aircraft_idle_in'],
        ['n10', 'n7', 'IC: delivery_out -> delivery_in'],
        ['n7', 'n6', 'EOC: aircraft_idle_out'],
        ['n7', 'n6', 'EOC: delivery_out'],

        ['n8', 'n11', 'contains'],
        ['n8', 'n14', 'contains'],
        ['n11', 'n12', 'contains'],
        ['n11', 'n13', 'contains'],
        ['n8', 'n11', 'EIC: assignment_in'],
        ['n11', 'n8', 'EOC: delivery_out'],
        ['n14', 'n8', 'EOC: idle_out'],
        ['n11', 'n12', 'EIC: assignment_in + maintenance_done_in'],
        ['n12', 'n11', 'EOC: delivery_out + maintenance_start_out'],
        ['n12', 'n13', 'IC: log_out -> log_in'],
        ['n11', 'n14', 'IC: maintenance_start_out -> maintenance_start_in'],
        ['n14', 'n11', 'IC: maintenance_done_out -> maintenance_done_in'],
      ],
      groups: [
        { members: ['n4', 'n5'], label: 'children of OpsCenterQueueCoordinator' },
        { members: ['n7', 'n8', 'n9', 'n10'], label: 'children of AircraftFleet' },
        { members: ['n11', 'n14'], label: 'children of AircraftUnit aircraft_1' },
        { members: ['n12', 'n13'], label: 'children of A1 AircraftMissionController' },
      ],
    },
    eval: [
      'Debug-copy benchmark replay: Score_ope=1.0 and Score_beh=1.0 across 9 SA evaluation settings.',
      'Pipeline: generated simulator entry -> benchmark/SA/sa_test_config.json test matrix -> benchmark/SA/checker.py scoring.',
      'All key rule groups pass: output_format, pallet_lifecycle, aircraft_state_machine, coordinator_logic, metrics_accuracy.',
      'Evaluation confirms timing consistency for return/maintenance_start lifecycle constraints.',
      'Evaluation artifact: SA benchmark summary output + benchmark/SA/checker.py.',
    ],
    evalFlow: [
      {
        id: 's1',
        step: 'Step 1',
        title: 'Load benchmark suite D and per-case runtime inputs for SA',
        paperStep: 'Sec.4.1 + Sec.4.3',
        artifact: 'benchmark/SA/sa_test_config.json',
        result:
          'Evaluator reads 9 SA settings (L0/L1/L2) with deterministic timing/fleet parameters and checker-side expectations.',
        sampleSelectionNote:
          'For readability, panel 4 shows one representative trace excerpt selected from all SA evaluation outputs. The underlying full log for this data point has 217 JSONL lines (time 0.0 to 501.0).',
        sampleConfig:
          '{"name":"L1_Queue_Formation","checker_args":{"test_name":"L1_Queue_Formation","aircraft_count":2,"duration":500.0},"cases":[{"sim_args":{"--duration":500.0,"--num_aircraft":2,"--pallet_interval":10.0,"--pallet_expiration_time":250.0,"--flight_time":30.0,"--unload_time":2.0,"--return_time":30.0,"--maintenance_time":5.0}}]}',
      },
      {
        id: 's2',
        step: 'Step 2',
        title: 'Execute generated model M(d_i) and emit JSONL trace T_i',
        paperStep: 'Sec.2.1 simulator M(I,J) and trace T',
        artifact:
          '.../strategic_airlift_eval_results/*/model_output_run0.jsonl',
        result:
          'Each case emits required entity/event records for facility, queue, coordinator, aircraft, and destination.',
        sampleLogNote:
          'Shown below is an excerpt for L1_Queue_Formation. Full trace has 217 JSONL lines.',
        sampleLogs:
          '{"time":0.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":1,"queue_size":1}}\n{"time":0.0,"entity":"facility","event":"pallet_generated","payload":{"pallet_id":1,"expiration_time":250.0}}\n{"time":0.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":1,"pallet_id":1}}\n{"time":0.0,"entity":"aircraft","event":"depart","payload":{"aircraft_id":1,"pallet_id":1}}\n{"time":10.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":2,"queue_size":1}}\n{"time":10.0,"entity":"facility","event":"pallet_generated","payload":{"pallet_id":2,"expiration_time":260.0}}\n{"time":10.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":2,"pallet_id":2}}\n{"time":10.0,"entity":"aircraft","event":"depart","payload":{"aircraft_id":2,"pallet_id":2}}\n{"time":20.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":3,"queue_size":1}}\n{"time":30.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":4,"queue_size":2}}\n{"time":32.0,"entity":"destination","event":"pallet_delivered","payload":{"pallet_id":1,"aircraft_id":1,"latency":32.0}}\n{"time":42.0,"entity":"destination","event":"pallet_delivered","payload":{"pallet_id":2,"aircraft_id":2,"latency":32.0}}\n{"time":67.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":1,"pallet_id":3}}\n{"time":77.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":2,"pallet_id":4}}',
      },
      {
        id: 's3',
        step: 'Step 3',
        title: 'Apply SA checker rules over operational, micro-level, and macro-level constraints',
        paperStep: 'Sec.4.1 Behavioral Conformance',
        artifact: 'benchmark/SA/checker.py',
        result:
          'Checker verifies lifecycle integrity, state-machine timing, assignment logic, and latency correctness with per-case add_case accumulation.',
      },
      {
        id: 's4',
        step: 'Step 4',
        title: 'Aggregate Score_ope/Score_beh over test suite D; SA run reaches 1.0/1.0',
        paperStep: 'Sec.4.3 Eq.(1)',
        artifact:
          '.../strategic_airlift_eval_results/summary.json',
        result:
          'All 9 SA entries return score=1.0, so aggregate benchmark score is 1.0 for this demo run.',
        formula: SA_METRIC_FORMULA,
        workedExample:
          'SA demo uses N=9 test cases.\n- All runs are operationally valid, so v_i=1 for all i and Score_ope=(1/9)*sum_i v_i=1.0.\n- All micro-level and macro-level rules pass, so c_i=1 for all i and Score_beh=(1/9)*sum_i c_i=1.0.',
      },
    ],
    evalRuleGroups: [
      {
        group: 'Operational Success (Spec_ope)',
        rules: [
          {
            name: 'output_format',
            what: 'Ensure valid simulation events exist and conform to required JSONL structure.',
            granularity: 'Per run and per line-level schema checks.',
            checkerCode:
              'validate_log_entry_hook(): checks required keys {time,entity,event,payload}, valid entity/event set, payload dict type.',
          },
        ],
      },
      {
        group: 'Micro-level Consistency',
        rules: [
          {
            name: 'pallet_lifecycle',
            what: 'Checks pallet conservation, deadline consistency, exact expiration timing, and delivery/assignment exclusivity.',
            granularity: 'Per pallet lifecycle.',
            checkerCode:
              '_check_pallet_lifecycle(): verify reported_deadline == gen_time + configured expiration and lifecycle transitions.',
          },
          {
            name: 'aircraft_state_machine',
            what: 'Validates cycle timing: Depart -> Return duration equals flight + unload + return; maintenance duration matches config.',
            granularity: 'Per aircraft cycle.',
            checkerCode:
              '_check_aircraft_statemachine(): compares actual cycle deltas with configured flight/unload/return/maintenance.',
          },
        ],
      },
      {
        group: 'Macro-level Causality',
        rules: [
          {
            name: 'coordinator_logic',
            what: 'Ensures near-zero load delay between assignment_created and matching depart event.',
            granularity: 'Per assignment.',
            checkerCode:
              '_check_coordinator_logic(): find matching depart by aircraft_id+pallet_id and enforce zero-duration loading tolerance.',
          },
          {
            name: 'metrics_accuracy',
            what: 'Verifies reported latency equals delivered_time - generated_time.',
            granularity: 'Per delivered pallet.',
            checkerCode:
              '_check_metrics_accuracy(): compare payload latency to reconstructed timestamps for each delivered pallet.',
          },
        ],
      },
    ],
    interactive: null,
  },
  {
    id: 'icu',
    title: 'ICU Case',
    tag: 'A constructed workflow demo case.',
    inputText: ICU_INPUT,
    sources: {
      input: 'devs_demo/demo_cases/ori_scenes.md (ICU scene)',
      plan: 'devs_reasoning_app/outputs_v54_icu/scene_1_spec.yaml',
      code: 'devs_reasoning_app/working_dirs/scene1_gen_v3/tasks/icu_sepsis_treatment/devs_project/',
      eval: 'devs_reasoning_app/outputs_v54_icu/scene_1_direct_answer.md + devs_reasoning_app/outputs_v54_icu/scene_1_assisted_answer.md',
    },
    planTree: {
      id: 'icu-root',
      name: 'icu_sepsis_treatment',
      type: 'coupled',
      summary: 'Batch coordinator + deterministic simulator + trace/result logging over 6-hour dynamics',
      initArgs: ['simulation_id', 'horizon_hours', 'state_update_interval_hours', 'initial_state', 'model_parameters'],
      initArgsTyped: [
        { name: 'simulation_id', type: 'str' },
        { name: 'horizon_hours', type: 'int' },
        { name: 'state_update_interval_hours', type: 'int' },
        { name: 'initial_state', type: 'dict' },
        { name: 'model_parameters', type: 'dict' },
      ],
      ports: { input: ['plans_in'], output: [] },
      portsTyped: { input: [{ name: 'plans_in', type: 'list' }], output: [] },
      details: {
        function:
          'Root coupled model receives externally supplied plan batches, dispatches each plan through the same deterministic simulator, aggregates plan results, and emits final comparison result.',
        logging:
          'Key logs: Batch Received, trace, Plan Result Prepared, Final Result Emitted, result.',
        schemas:
          'plans_in:list -> plan_result:{final_state,final_score} -> result:{plans,best_plan_id}',
      },
      children: [
        {
          id: 'icu-batch',
          name: 'plan_batch_coordinator',
          type: 'atomic',
          summary: 'Validates batch payload, dispatches plans, forwards per-plan results',
          initArgs: ['simulation_id', 'horizon_hours', 'state_update_interval_hours', 'initial_state', 'model_parameters'],
          initArgsTyped: [
            { name: 'simulation_id', type: 'str' },
            { name: 'horizon_hours', type: 'int' },
          ],
          ports: { input: ['plans_in', 'plan_result_in'], output: ['plan_out', 'batch_meta_out', 'plan_result_out'] },
          portsTyped: {
            input: [
              { name: 'plans_in', type: 'list' },
              { name: 'plan_result_in', type: 'dict' },
            ],
            output: [
              { name: 'plan_out', type: 'dict' },
              { name: 'batch_meta_out', type: 'dict' },
              { name: 'plan_result_out', type: 'dict' },
            ],
          },
          details: {
            function: 'Consumes one plan batch, preserves deterministic order, and coordinates full batch completion.',
            logging: 'Emits Batch Received / Plan Result Received / Batch Completed.',
            schemas: 'plans_in -> plan_out + batch_meta_out; plan_result_in -> plan_result_out',
          },
          children: [],
        },
        {
          id: 'icu-sim',
          name: 'plan_simulator',
          type: 'atomic',
          summary: 'Deterministic hourly transition + scoring for each plan',
          initArgs: ['simulation_id', 'horizon_hours', 'state_update_interval_hours', 'initial_state', 'model_parameters'],
          initArgsTyped: [
            { name: 'simulation_id', type: 'str' },
            { name: 'horizon_hours', type: 'int' },
          ],
          ports: { input: ['plan_in'], output: ['trace_out', 'plan_result_out'] },
          portsTyped: {
            input: [{ name: 'plan_in', type: 'dict' }],
            output: [
              { name: 'trace_out', type: 'dict' },
              { name: 'plan_result_out', type: 'dict' },
            ],
          },
          details: {
            function:
              'Applies delayed vasopressor/fluid/antibiotic effects, low-BP+high-infection kidney hazard, and end-of-hour scoring over horizon.',
            logging: 'Emits trace per hour and one plan result per plan.',
            schemas: 'plan_in:{plan_id,action_timeline} -> plan_result_out:{final_state,final_score,score_breakdown}',
          },
          children: [],
        },
        {
          id: 'icu-trace',
          name: 'trace_logger',
          type: 'atomic',
          summary: 'Pass-through trace event logger',
          initArgs: ['simulation_id'],
          initArgsTyped: [{ name: 'simulation_id', type: 'str' }],
          ports: { input: ['trace_in'], output: [] },
          portsTyped: { input: [{ name: 'trace_in', type: 'dict' }], output: [] },
          details: {
            function: 'Receives all trace events from simulator and logs them in deterministic order.',
            logging: 'Emits trace events only.',
            schemas: 'trace_in -> log(trace)',
          },
          children: [],
        },
        {
          id: 'icu-agg',
          name: 'result_aggregator',
          type: 'atomic',
          summary: 'Collects plan results and emits single batch result',
          initArgs: ['simulation_id', 'horizon_hours'],
          initArgsTyped: [
            { name: 'simulation_id', type: 'str' },
            { name: 'horizon_hours', type: 'int' },
          ],
          ports: { input: ['batch_meta_in', 'plan_result_in'], output: ['result_out'] },
          portsTyped: {
            input: [
              { name: 'batch_meta_in', type: 'dict' },
              { name: 'plan_result_in', type: 'dict' },
            ],
            output: [{ name: 'result_out', type: 'dict' }],
          },
          details: {
            function: 'Deterministically sorts/compares plan results and emits one result event with best_plan_id.',
            logging: 'Emits Final Result Prepared and result.',
            schemas: 'batch_meta + plan_results -> result:{plans,best_plan_id}',
          },
          children: [],
        },
        {
          id: 'icu-rlog',
          name: 'result_logger',
          type: 'atomic',
          summary: 'Final result logger',
          initArgs: ['simulation_id'],
          initArgsTyped: [{ name: 'simulation_id', type: 'str' }],
          ports: { input: ['result_in'], output: [] },
          portsTyped: { input: [{ name: 'result_in', type: 'dict' }], output: [] },
          details: {
            function: 'Logs the final result event exactly once.',
            logging: 'Emits result event to output stream.',
            schemas: 'result_in -> log(result)',
          },
          children: [],
        },
      ],
    },
    codeGraph: {
      nodes: [
        {
          id: 'c1',
          label: 'icu_sepsis_treatment (coupled)',
          modelType: 'coupled',
          x: 440,
          y: 70,
          ports: { in: ['plans_in'], out: [] },
          portsTyped: { in: [{ name: 'plans_in', type: 'list' }], out: [] },
          file: 'icu_sepsis_treatment.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        simulation_id: str,
        horizon_hours: int,
        state_update_interval_hours: int,
        initial_state: dict,
        model_parameters: dict,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into sub-model configurations and logs.
            horizon_hours (int): Batch simulation horizon in hours. Expected value for this task is 6.
            state_update_interval_hours (int): State update interval in hours. Expected value for this task is 1.
            initial_state (dict): Shared initial patient state for all evaluated plans.
                blood_pressure (str): Initial blood pressure category; expected "low" or "stable".
                infection_burden (str): Initial infection burden category; expected "high", "medium", or "low".
                kidney_stress (str): Initial kidney stress category; expected "mild", "moderate", or "severe".
                fluid_overload (bool): Initial fluid overload status.
            model_parameters (dict): Deterministic rule parameters used by coordinator and simulator.
                fluid_support_delay_hours (int): Delay from IV fluid administration to support start.
                fluid_support_duration_hours (int): Duration of fluid-support activity once started.
                antibiotic_delay_hours (int): Delay from antibiotic administration to effect activation.
                max_intervention_hour (int): Latest hour allowed to contain non-empty interventions.
                repeated_vasopressor_toxicity_rule (str): Human-readable deterministic rule description.
                fluid_overload_rule (str): Human-readable deterministic rule description.
                infection_reduction_rule (str): Human-readable deterministic rule description.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "component_names": [
                "batch_coordinator",
                "plan_simulator",
                "trace_logger",
                "result_aggregator",
                "result_logger",
            ],
            "evaluator_count": 1,
            "architecture": "single_plan_simulator_with_batch_coordination_and_result_aggregation",
        }

        self.add_in_port(Port(list, "plans_in"))

        batch_coordinator = plan_batch_coordinator(
            name="batch_coordinator",
            parent=self,
            simulation_id=simulation_id,
            horizon_hours=horizon_hours,
            state_update_interval_hours=state_update_interval_hours,
            initial_state=initial_state,
            model_parameters=model_parameters,
        )
        simulator = plan_simulator(
            name="plan_simulator",
            parent=self,
            simulation_id=simulation_id,
            horizon_hours=horizon_hours,
            state_update_interval_hours=state_update_interval_hours,
            initial_state=initial_state,
            model_parameters=model_parameters,
        )
        trace_log = trace_logger(
            name="trace_logger",
            parent=self,
            simulation_id=simulation_id,
        )
        aggregator = result_aggregator(
            name="result_aggregator",
            parent=self,
            simulation_id=simulation_id,
            horizon_hours=horizon_hours,
        )
        final_result_logger = result_logger(
            name="result_logger",
            parent=self,
            simulation_id=simulation_id,
        )

        self.add_component(batch_coordinator)
        self.add_component(simulator)
        self.add_component(trace_log)
        self.add_component(aggregator)
        self.add_component(final_result_logger)

        self.add_coupling(self.input["plans_in"], batch_coordinator.input["plans_in"])

        self.add_coupling(batch_coordinator.output["plan_out"], simulator.input["plan_in"])
        self.add_coupling(batch_coordinator.output["batch_meta_out"], aggregator.input["batch_meta_in"])
        self.add_coupling(simulator.output["trace_out"], trace_log.input["trace_in"])
        self.add_coupling(simulator.output["plan_result_out"], batch_coordinator.input["plan_result_in"])
        self.add_coupling(batch_coordinator.output["plan_result_out"], aggregator.input["plan_result_in"])
        self.add_coupling(aggregator.output["result_out"], final_result_logger.input["result_in"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": self.name,
                "simulation_id": simulation_id,
                "horizon_hours": horizon_hours,
                "state_update_interval_hours": state_update_interval_hours,
                "initial_state": {
                    "blood_pressure": initial_state["blood_pressure"],
                    "infection_burden": initial_state["infection_burden"],
                    "kidney_stress": initial_state["kidney_stress"],
                    "fluid_overload": initial_state["fluid_overload"],
                },
                "model_parameters": {
                    "fluid_support_delay_hours": model_parameters["fluid_support_delay_hours"],
                    "fluid_support_duration_hours": model_parameters["fluid_support_duration_hours"],
                    "antibiotic_delay_hours": model_parameters["antibiotic_delay_hours"],
                    "max_intervention_hour": model_parameters["max_intervention_hour"],
                    "repeated_vasopressor_toxicity_rule": model_parameters["repeated_vasopressor_toxicity_rule"],
                    "fluid_overload_rule": model_parameters["fluid_overload_rule"],
                    "infection_reduction_rule": model_parameters["infection_reduction_rule"],
                },
                "param": self.param,
                "time": get_current_time(),
            },
            log_type="PROCESS",
        )`,
          },
        },
        {
          id: 'c2',
          label: 'plan_batch_coordinator',
          modelType: 'atomic',
          x: 170,
          y: 240,
          ports: { in: ['plans_in', 'plan_result_in'], out: ['plan_out', 'batch_meta_out', 'plan_result_out'] },
          portsTyped: {
            in: [{ name: 'plans_in', type: 'list' }, { name: 'plan_result_in', type: 'dict' }],
            out: [{ name: 'plan_out', type: 'dict' }, { name: 'batch_meta_out', type: 'dict' }, { name: 'plan_result_out', type: 'dict' }],
          },
          file: 'icu_sepsis_treatment_libs/plan_batch_coordinator.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        simulation_id: str,
        horizon_hours: int,
        state_update_interval_hours: int,
        initial_state: dict,
        model_parameters: dict
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into logs.
            horizon_hours (int): Batch simulation horizon. Must be 6 for this task.
            state_update_interval_hours (int): State update interval. Must be 1 for this task.
            initial_state (dict): Starting patient state shared across independently evaluated plans.
                blood_pressure (str): Initial blood pressure category, "low" or "stable".
                infection_burden (str): Initial infection burden category, "high", "medium", or "low".
                kidney_stress (str): Initial kidney stress category, "mild", "moderate", or "severe".
                fluid_overload (bool): Initial fluid overload flag.
            model_parameters (dict): Deterministic model parameter contract forwarded conceptually to sibling simulators.
                fluid_support_delay_hours (int): Delay before fluid support starts.
                fluid_support_duration_hours (int): Duration of fluid support.
                antibiotic_delay_hours (int): Delay before antibiotic effect starts.
                max_intervention_hour (int): Maximum hour at which interventions are allowed.
                repeated_vasopressor_toxicity_rule (str): Documentation string for deterministic vasopressor toxicity rule.
                fluid_overload_rule (str): Documentation string for deterministic fluid overload rule.
                infection_reduction_rule (str): Documentation string for deterministic infection reduction rule.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(list, "plans_in"))
        self.add_in_port(Port(dict, "plan_result_in"))
        self.add_out_port(Port(dict, "plan_out"))
        self.add_out_port(Port(dict, "batch_meta_out"))
        self.add_out_port(Port(dict, "plan_result_out"))

        self.simulation_id = simulation_id
        self.horizon_hours = horizon_hours
        self.state_update_interval_hours = state_update_interval_hours
        self.initial_state = {
            "blood_pressure": initial_state["blood_pressure"],
            "infection_burden": initial_state["infection_burden"],
            "kidney_stress": initial_state["kidney_stress"],
            "fluid_overload": initial_state["fluid_overload"]
        }
        self.model_parameters = {
            "fluid_support_delay_hours": model_parameters["fluid_support_delay_hours"],
            "fluid_support_duration_hours": model_parameters["fluid_support_duration_hours"],
            "antibiotic_delay_hours": model_parameters["antibiotic_delay_hours"],
            "max_intervention_hour": model_parameters["max_intervention_hour"],
            "repeated_vasopressor_toxicity_rule": model_parameters["repeated_vasopressor_toxicity_rule"],
            "fluid_overload_rule": model_parameters["fluid_overload_rule"],
            "infection_reduction_rule": model_parameters["infection_reduction_rule"]
        }

        self.param = {
            "allowed_actions": ["vasopressor", "iv_fluids", "antibiotic"],
            "allowed_blood_pressure": ["low", "stable"],
            "allowed_infection_burden": ["high", "medium", "low"],
            "allowed_kidney_stress": ["mild", "moderate", "severe"],
            "expected_horizon_hours": 6,
            "expected_state_update_interval_hours": 1
        }

        self.batch_received = False
        self.batch_dispatched = False
        self.batch_aborted = False
        self.plan_order = []
        self.expected_plan_count = 0
        self.received_plan_results = 0
        self.forwarded_plan_results = 0
        self.received_result_plan_ids = []
        self.pending_plan_outputs = []
        self.pending_batch_meta = None
        self.pending_result_outputs = []
        self.last_error = None

        self.hold_in("WAITING", float("inf"))

        self.logger.info(
            {
                "event": "Model Created",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "state_update_interval_hours": self.state_update_interval_hours,
                "initial_state": self.initial_state,
                "model_parameters": self.model_parameters,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,
            initialize: `    def initialize(self):
        self.batch_received = False
        self.batch_dispatched = False
        self.batch_aborted = False
        self.plan_order = []
        self.expected_plan_count = 0
        self.received_plan_results = 0
        self.forwarded_plan_results = 0
        self.received_result_plan_ids = []
        self.pending_plan_outputs = []
        self.pending_batch_meta = None
        self.pending_result_outputs = []
        self.last_error = None

        self.hold_in("WAITING", float("inf"))
        self.logger.info(
            {
                "event": "Model Initialized",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,
            _copy_initial_state: `    def _copy_initial_state(self) -> dict:
        return {
            "blood_pressure": self.initial_state["blood_pressure"],
            "infection_burden": self.initial_state["infection_burden"],
            "kidney_stress": self.initial_state["kidney_stress"],
            "fluid_overload": self.initial_state["fluid_overload"]
        }`,
            _validate_and_normalize_plan_batch: `    def _validate_and_normalize_plan_batch(self, plans: list) -> tuple[bool, list, dict | None]:
        if self.horizon_hours != self.param["expected_horizon_hours"]:
            return False, [], {
                "event": "Batch Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_horizon_hours",
                "horizon_hours": self.horizon_hours,
                "expected_horizon_hours": self.param["expected_horizon_hours"],
                "time": get_current_time()
            }

        if self.state_update_interval_hours != self.param["expected_state_update_interval_hours"]:
            return False, [], {
                "event": "Batch Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_state_update_interval_hours",
                "state_update_interval_hours": self.state_update_interval_hours,
                "expected_state_update_interval_hours": self.param["expected_state_update_interval_hours"],
                "time": get_current_time()
            }

        if not isinstance(plans, list):
            return False, [], {
                "event": "Batch Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "plans_in_not_list",
                "time": get_current_time()
            }

        normalized = []
        seen_plan_ids = []

        for index, plan in enumerate(plans):
            if not isinstance(plan, dict):
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "plan_not_dict",
                    "plan_index": index,
                    "time": get_current_time()
                }

            if "plan_id" not in plan or "action_timeline" not in plan:
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "missing_plan_fields",
                    "plan_index": index,
                    "time": get_current_time()
                }

            plan_id = plan["plan_id"]
            action_timeline = plan["action_timeline"]

            if not isinstance(plan_id, str):
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "plan_id_not_str",
                    "plan_index": index,
                    "time": get_current_time()
                }

            if plan_id in seen_plan_ids:
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "duplicate_plan_id",
                    "plan_id": plan_id,
                    "plan_index": index,
                    "time": get_current_time()
                }

            if not isinstance(action_timeline, dict):
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "action_timeline_not_dict",
                    "plan_id": plan_id,
                    "time": get_current_time()
                }

            normalized_timeline = {}
            max_intervention_hour = self.model_parameters["max_intervention_hour"]

            for hour_key, actions in action_timeline.items():
                if not isinstance(hour_key, str):
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_key_not_str",
                        "plan_id": plan_id,
                        "time": get_current_time()
                    }

                try:
                    hour_int = int(hour_key)
                except Exception:
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_key_not_integer_string",
                        "plan_id": plan_id,
                        "hour": hour_key,
                        "time": get_current_time()
                    }

                if str(hour_int) != hour_key:
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_key_not_canonical_integer_string",
                        "plan_id": plan_id,
                        "hour": hour_key,
                        "time": get_current_time()
                    }

                if hour_int < 0 or hour_int > max_intervention_hour:
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_out_of_allowed_range",
                        "plan_id": plan_id,
                        "hour": hour_int,
                        "max_intervention_hour": max_intervention_hour,
                        "time": get_current_time()
                    }

                if not isinstance(actions, list):
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "actions_not_list",
                        "plan_id": plan_id,
                        "hour": hour_int,
                        "time": get_current_time()
                    }

                normalized_actions = []
                seen_actions = []
                for action in actions:
                    if not isinstance(action, str):
                        return False, [], {
                            "event": "Batch Validation Error",
                            "simulation_id": self.simulation_id,
                            "reason": "action_not_str",
                            "plan_id": plan_id,
                            "hour": hour_int,
                            "time": get_current_time()
                        }
                    if action not in self.param["allowed_actions"]:
                        return False, [], {
                            "event": "Batch Validation Error",
                            "simulation_id": self.simulation_id,
                            "reason": "unknown_action",
                            "plan_id": plan_id,
                            "hour": hour_int,
                            "action": action,
                            "time": get_current_time()
                        }
                    if action in seen_actions:
                        return False, [], {
                            "event": "Batch Validation Error",
                            "simulation_id": self.simulation_id,
                            "reason": "duplicate_action_same_hour",
                            "plan_id": plan_id,
                            "hour": hour_int,
                            "action": action,
                            "time": get_current_time()
                        }
                    seen_actions.append(action)
                    normalized_actions.append(action)

                normalized_timeline[str(hour_int)] = normalized_actions

            for hour_int in range(0, max_intervention_hour + 1):
                hour_key = str(hour_int)
                if hour_key not in normalized_timeline:
                    normalized_timeline[hour_key] = []

            normalized.append(
                {
                    "plan_id": plan_id,
                    "action_timeline": normalized_timeline
                }
            )
            seen_plan_ids.append(plan_id)

        return True, normalized, None`,
            _validate_plan_result: `    def _validate_plan_result(self, result_payload: dict) -> tuple[bool, dict | None]:
        if not isinstance(result_payload, dict):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "result_not_dict",
                "time": get_current_time()
            }

        required_top = ["plan_id", "final_state", "final_score", "score_breakdown"]
        for key in required_top:
            if key not in result_payload:
                return False, {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "missing_result_field",
                    "missing_field": key,
                    "time": get_current_time()
                }

        if not isinstance(result_payload["plan_id"], str):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "plan_id_not_str",
                "time": get_current_time()
            }

        if result_payload["plan_id"] not in self.plan_order:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "unknown_plan_id_result",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        final_state = result_payload["final_state"]
        if not isinstance(final_state, dict):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "final_state_not_dict",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        for field in ["blood_pressure", "infection_burden", "kidney_stress", "fluid_overload"]:
            if field not in final_state:
                return False, {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "missing_final_state_field",
                    "plan_id": result_payload["plan_id"],
                    "missing_field": field,
                    "time": get_current_time()
                }

        if final_state["blood_pressure"] not in self.param["allowed_blood_pressure"]:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_blood_pressure",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if final_state["infection_burden"] not in self.param["allowed_infection_burden"]:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_infection_burden",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if final_state["kidney_stress"] not in self.param["allowed_kidney_stress"]:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_kidney_stress",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if not isinstance(final_state["fluid_overload"], bool):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "fluid_overload_not_bool",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if not isinstance(result_payload["final_score"], int):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "final_score_not_int",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        score_breakdown = result_payload["score_breakdown"]
        if not isinstance(score_breakdown, dict):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "score_breakdown_not_dict",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        for field in ["blood_pressure_points", "infection_points", "kidney_penalty", "fluid_overload_penalty"]:
            if field not in score_breakdown or not isinstance(score_breakdown[field], int):
                return False, {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "invalid_score_breakdown_field",
                    "plan_id": result_payload["plan_id"],
                    "missing_or_invalid_field": field,
                    "time": get_current_time()
                }

        return True, None`,
            lambdaf: `    def lambdaf(self):
        if self.phase == "DISPATCH":
            if self.pending_batch_meta is not None:
                self.output["batch_meta_out"].add(self.pending_batch_meta)
            for payload in self.pending_plan_outputs:
                self.output["plan_out"].add(payload)

        elif self.phase == "FORWARD_RESULT":
            for payload in self.pending_result_outputs:
                self.output["plan_result_out"].add(payload)`,
            deltint: `    def deltint(self):
        old_phase = self.phase
        _ = self.ta()

        if old_phase == "DISPATCH":
            self.batch_dispatched = True
            self.logger.info(
                {
                    "event": "Batch Dispatch Prepared",
                    "simulation_id": self.simulation_id,
                    "plan_order": self.plan_order,
                    "plan_count": self.expected_plan_count,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )
            self.pending_plan_outputs = []
            self.pending_batch_meta = None

            if self.expected_plan_count == 0:
                self.hold_in("DONE", float("inf"))
                self.logger.info(
                    {
                        "event": "Batch Completed",
                        "simulation_id": self.simulation_id,
                        "expected_plan_count": self.expected_plan_count,
                        "received_plan_results": self.received_plan_results,
                        "forwarded_plan_results": self.forwarded_plan_results,
                        "time": get_current_time()
                    },
                    log_type="PROCESS"
                )
            else:
                self.hold_in("WAITING", float("inf"))

        elif old_phase == "FORWARD_RESULT":
            forwarded_now = len(self.pending_result_outputs)
            self.forwarded_plan_results += forwarded_now
            self.pending_result_outputs = []

            if self.received_plan_results >= self.expected_plan_count and self.expected_plan_count > 0:
                self.hold_in("DONE", float("inf"))
                self.logger.info(
                    {
                        "event": "Batch Completed",
                        "simulation_id": self.simulation_id,
                        "expected_plan_count": self.expected_plan_count,
                        "received_plan_results": self.received_plan_results,
                        "forwarded_plan_results": self.forwarded_plan_results,
                        "time": get_current_time()
                    },
                    log_type="PROCESS"
                )
            else:
                self.hold_in("WAITING", float("inf"))

        else:
            self.hold_in(self.phase, float("inf"))`,
            deltext: `    def deltext(self, e: float):
        current_phase = self.phase
        remaining = self.ta()
        if remaining != float("inf"):
            remaining = max(0.0, remaining - e)

        incoming_batches = []
        for batch in self.input["plans_in"].values:
            incoming_batches.append(batch)

        incoming_results = []
        for result_payload in self.input["plan_result_in"].values:
            incoming_results.append(result_payload)

        if len(incoming_batches) > 0:
            if self.batch_received:
                self.last_error = {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "multiple_batches_received",
                    "batch_count_received_now": len(incoming_batches),
                    "time": get_current_time()
                }
                self.logger.info(self.last_error, log_type="ERROR")
                self.batch_aborted = True
                self.hold_in("DONE", float("inf"))
                return

            if len(incoming_batches) != 1:
                self.last_error = {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "expected_single_batch_event",
                    "batch_count_received_now": len(incoming_batches),
                    "time": get_current_time()
                }
                self.logger.info(self.last_error, log_type="ERROR")
                self.batch_aborted = True
                self.hold_in("DONE", float("inf"))
                return

            batch_payload = incoming_batches[0]
            valid, normalized_plans, error_payload = self._validate_and_normalize_plan_batch(batch_payload)
            if not valid:
                self.last_error = error_payload
                self.logger.info(error_payload, log_type="ERROR")
                self.batch_aborted = True
                self.hold_in("DONE", float("inf"))
                return

            self.batch_received = True
            self.plan_order = [plan["plan_id"] for plan in normalized_plans]
            self.expected_plan_count = len(normalized_plans)

            self.pending_plan_outputs = []
            for index, plan in enumerate(normalized_plans):
                self.pending_plan_outputs.append(
                    {
                        "plan_index": index,
                        "plan_id": plan["plan_id"],
                        "action_timeline": plan["action_timeline"],
                        "initial_state": self._copy_initial_state()
                    }
                )

            self.pending_batch_meta = {
                "plan_order": [plan_id for plan_id in self.plan_order],
                "plan_count": self.expected_plan_count,
                "horizon_hours": self.horizon_hours
            }

            self.logger.info(
                {
                    "event": "Batch Received",
                    "simulation_id": self.simulation_id,
                    "plan_order": self.plan_order,
                    "plan_count": self.expected_plan_count,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )

            self.hold_in("DISPATCH", 0.0)
            return

        if len(incoming_results) > 0:
            if not self.batch_received or self.batch_aborted:
                self.last_error = {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "result_received_before_valid_batch",
                    "result_count_received_now": len(incoming_results),
                    "time": get_current_time()
                }
                self.logger.info(self.last_error, log_type="ERROR")
                self.hold_in("DONE", float("inf"))
                return

            prepared = []
            for result_payload in incoming_results:
                valid, error_payload = self._validate_plan_result(result_payload)
                if not valid:
                    self.last_error = error_payload
                    self.logger.info(error_payload, log_type="ERROR")
                    self.batch_aborted = True
                    self.hold_in("DONE", float("inf"))
                    return

                plan_id = result_payload["plan_id"]
                if plan_id in self.received_result_plan_ids:
                    self.last_error = {
                        "event": "Plan Result Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "duplicate_plan_result",
                        "plan_id": plan_id,
                        "time": get_current_time()
                    }
                    self.logger.info(self.last_error, log_type="ERROR")
                    self.batch_aborted = True
                    self.hold_in("DONE", float("inf"))
                    return

                self.received_result_plan_ids.append(plan_id)
                self.received_plan_results += 1
                prepared.append(
                    {
                        "plan_id": result_payload["plan_id"],
                        "final_state": {
                            "blood_pressure": result_payload["final_state"]["blood_pressure"],
                            "infection_burden": result_payload["final_state"]["infection_burden"],
                            "kidney_stress": result_payload["final_state"]["kidney_stress"],
                            "fluid_overload": result_payload["final_state"]["fluid_overload"]
                        },
                        "final_score": result_payload["final_score"],
                        "score_breakdown": {
                            "blood_pressure_points": result_payload["score_breakdown"]["blood_pressure_points"],
                            "infection_points": result_payload["score_breakdown"]["infection_points"],
                            "kidney_penalty": result_payload["score_breakdown"]["kidney_penalty"],
                            "fluid_overload_penalty": result_payload["score_breakdown"]["fluid_overload_penalty"]
                        }
                    }
                )

                self.logger.info(
                    {
                        "event": "Plan Result Received",
                        "simulation_id": self.simulation_id,
                        "plan_id": plan_id,
                        "received_plan_results": self.received_plan_results,
                        "expected_plan_count": self.expected_plan_count,
                        "time": get_current_time()
                    },
                    log_type="PROCESS"
                )

            self.pending_result_outputs = prepared
            self.hold_in("FORWARD_RESULT", 0.0)
            return

        self.hold_in(current_phase, remaining)`,
            exit: `    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "batch_received": self.batch_received,
                "batch_dispatched": self.batch_dispatched,
                "batch_aborted": self.batch_aborted,
                "expected_plan_count": self.expected_plan_count,
                "received_plan_results": self.received_plan_results,
                "forwarded_plan_results": self.forwarded_plan_results,
                "plan_order": self.plan_order,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`,
          },
        },
        {
          id: 'c3',
          label: 'plan_simulator',
          modelType: 'atomic',
          x: 420,
          y: 240,
          ports: { in: ['plan_in'], out: ['trace_out', 'plan_result_out'] },
          portsTyped: {
            in: [{ name: 'plan_in', type: 'dict' }],
            out: [{ name: 'trace_out', type: 'dict' }, { name: 'plan_result_out', type: 'dict' }],
          },
          file: 'icu_sepsis_treatment_libs/plan_simulator.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        simulation_id: str,
        horizon_hours: int,
        state_update_interval_hours: int,
        initial_state: dict,
        model_parameters: dict,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into all emitted trace logs.
            horizon_hours (int): Simulation horizon in hours. Must be 6 for this task and hours 0 through 6 inclusive are evaluated.
            state_update_interval_hours (int): Hourly update interval. Must be 1 for this task.
            initial_state (dict): Default initial patient state.
                blood_pressure (str): Initial blood pressure category, "low" or "stable".
                infection_burden (str): Initial infection burden category, "high", "medium", or "low".
                kidney_stress (str): Initial kidney stress category, "mild", "moderate", or "severe".
                fluid_overload (bool): Initial fluid overload flag.
            model_parameters (dict): Deterministic model parameters and rule labels.
                fluid_support_delay_hours (int): Delay from IV fluid administration to support start.
                fluid_support_duration_hours (int): Number of hours fluid support remains active once started.
                antibiotic_delay_hours (int): Delay from antibiotic administration to infection effect activation.
                max_intervention_hour (int): Last hour in which interventions may be scheduled.
                repeated_vasopressor_toxicity_rule (str): Human-readable deterministic toxicity rule description.
                fluid_overload_rule (str): Human-readable deterministic overload rule description.
                infection_reduction_rule (str): Human-readable deterministic infection reduction rule description.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "plan_in"))
        self.add_out_port(Port(dict, "trace_out"))
        self.add_out_port(Port(dict, "plan_result_out"))

        self.simulation_id = simulation_id
        self.horizon_hours = horizon_hours
        self.state_update_interval_hours = state_update_interval_hours
        self.default_initial_state = {
            "blood_pressure": initial_state["blood_pressure"],
            "infection_burden": initial_state["infection_burden"],
            "kidney_stress": initial_state["kidney_stress"],
            "fluid_overload": initial_state["fluid_overload"],
        }
        self.model_parameters = {
            "fluid_support_delay_hours": model_parameters["fluid_support_delay_hours"],
            "fluid_support_duration_hours": model_parameters[
                "fluid_support_duration_hours"
            ],
            "antibiotic_delay_hours": model_parameters["antibiotic_delay_hours"],
            "max_intervention_hour": model_parameters["max_intervention_hour"],
            "repeated_vasopressor_toxicity_rule": model_parameters[
                "repeated_vasopressor_toxicity_rule"
            ],
            "fluid_overload_rule": model_parameters["fluid_overload_rule"],
            "infection_reduction_rule": model_parameters["infection_reduction_rule"],
        }

        self.param = {
            "allowed_actions": ["vasopressor", "iv_fluids", "antibiotic"],
            "blood_pressure_order": ["low", "stable"],
            "infection_order": ["high", "medium", "low"],
            "kidney_order": ["mild", "moderate", "severe"],
            "fluid_overload_threshold": 2,
        }

        self.plan_loaded = False
        self.plan_index = -1
        self.plan_id = ""
        self.plan_queue = []
        self.action_timeline = {}

        self.current_hour = 0
        self.state = {}
        self.fluid_tokens = []
        self.antibiotic_tokens = []
        self.vasopressor_count = 0
        self.fluid_count = 0

        self.pending_trace_payload = None
        self.pending_result_payload = None

        self.trace_count = 0
        self.error_count = 0

        self.hold_in("WAIT_PLAN", math.inf)

        self.logger.info(
            {
                "event": "Model Created",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "state_update_interval_hours": self.state_update_interval_hours,
                "initial_state": self.default_initial_state,
                "model_parameters": self.model_parameters,
                "param": self.param,
                "time": get_current_time(),
            },
            log_type="PROCESS",
        )`,
            initialize: `    def initialize(self):
        self.plan_loaded = False
        self.plan_index = -1
        self.plan_id = ""
        self.plan_queue = []
        self.action_timeline = {}
        self.current_hour = 0
        self.state = {
            "blood_pressure": self.default_initial_state["blood_pressure"],
            "infection_burden": self.default_initial_state["infection_burden"],
            "kidney_stress": self.default_initial_state["kidney_stress"],
            "fluid_overload": self.default_initial_state["fluid_overload"],
        }
        self.fluid_tokens = []
        self.antibiotic_tokens = []
        self.vasopressor_count = 0
        self.fluid_count = 0
        self.pending_trace_payload = None
        self.pending_result_payload = None
        self.trace_count = 0
        self.error_count = 0

        self.logger.info(
            {
                "event": "Model Initialized",
                "simulation_id": self.simulation_id,
                "phase": "WAIT_PLAN",
                "time": get_current_time(),
            },
            log_type="PROCESS",
        )
        self.hold_in("WAIT_PLAN", math.inf)`,
            lambdaf: `    def lambdaf(self):
        if self.phase == "EMIT_TRACE" and self.pending_trace_payload is not None:
            self.output["trace_out"].add(self.pending_trace_payload)
        elif self.phase == "EMIT_RESULT" and self.pending_result_payload is not None:
            self.output["plan_result_out"].add(self.pending_result_payload)`,
            deltint: `    def deltint(self):
        old_phase = self.phase
        old_sigma = self.ta()

        if old_phase == "EMIT_TRACE":
            self.trace_count += 1
            self.logger.info(self.pending_trace_payload, log_type="PROCESS")

            if self.current_hour < self.horizon_hours:
                self.current_hour += 1
                self.pending_trace_payload = self._simulate_hour(self.current_hour)
                self.hold_in("EMIT_TRACE", 0)
            else:
                self.pending_result_payload = self._build_plan_result()
                self.logger.info(
                    {
                        "event": "Plan Result Prepared",
                        "simulation_id": self.simulation_id,
                        "plan_id": self.plan_id,
                        "result": self.pending_result_payload,
                        "time": get_current_time(),
                    },
                    log_type="RESULT",
                )
                self.hold_in("EMIT_RESULT", 0)

        elif old_phase == "EMIT_RESULT":
            self.pending_result_payload = None
            self.plan_loaded = False
            self.plan_index = -1
            self.plan_id = ""

            if len(self.plan_queue) > 0:
                next_plan = self.plan_queue.pop(0)
                try:
                    self._load_plan(next_plan)
                    self.pending_trace_payload = self._simulate_hour(0)
                    self.logger.info(
                        {
                            "event": "Plan Accepted",
                            "simulation_id": self.simulation_id,
                            "plan_id": self.plan_id,
                            "plan_index": self.plan_index,
                            "time": get_current_time(),
                        },
                        log_type="PROCESS",
                    )
                    self.hold_in("EMIT_TRACE", 0)
                except Exception as exc:
                    self.error_count += 1
                    self.logger.info(
                        {
                            "event": "Plan Validation Error",
                            "simulation_id": self.simulation_id,
                            "error": str(exc),
                            "received_payload": next_plan,
                            "time": get_current_time(),
                        },
                        log_type="ERROR",
                    )
                    self.hold_in("WAIT_PLAN", math.inf)
            else:
                self.hold_in("WAIT_PLAN", math.inf)

        else:
            self.hold_in(old_phase, old_sigma)`,
            deltext: `    def deltext(self, e: float):
        if self.phase == "WAIT_PLAN":
            for plan_payload in self.input["plan_in"].values:
                self.plan_queue.append(plan_payload)

            if len(self.plan_queue) > 0:
                plan_payload = self.plan_queue.pop(0)
                try:
                    self._load_plan(plan_payload)
                    self.pending_trace_payload = self._simulate_hour(0)
                    self.logger.info(
                        {
                            "event": "Plan Accepted",
                            "simulation_id": self.simulation_id,
                            "plan_id": self.plan_id,
                            "plan_index": self.plan_index,
                            "time": get_current_time(),
                        },
                        log_type="PROCESS",
                    )
                    self.hold_in("EMIT_TRACE", 0)
                    return
                except Exception as exc:
                    self.error_count += 1
                    self.logger.info(
                        {
                            "event": "Plan Validation Error",
                            "simulation_id": self.simulation_id,
                            "error": str(exc),
                            "received_payload": plan_payload,
                            "time": get_current_time(),
                        },
                        log_type="ERROR",
                    )
                    self.hold_in("WAIT_PLAN", math.inf)
                    return
            self.hold_in("WAIT_PLAN", math.inf)
        else:
            for plan_payload in self.input["plan_in"].values:
                self.plan_queue.append(plan_payload)
            remaining = self.ta()
            if math.isinf(remaining):
                self.hold_in(self.phase, math.inf)
            else:
                self.hold_in(self.phase, max(0.0, remaining - e))`,
            exit: `    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "plan_loaded": self.plan_loaded,
                "plan_id": self.plan_id,
                "trace_count": self.trace_count,
                "error_count": self.error_count,
                "time": get_current_time(),
            },
            log_type="RESULT",
        )`,
            _load_plan: `    def _load_plan(self, plan_payload: dict):
        self._validate_plan_payload(plan_payload)

        self.plan_loaded = True
        self.plan_index = plan_payload["plan_index"]
        self.plan_id = plan_payload["plan_id"]
        self.action_timeline = self._normalize_timeline(plan_payload["action_timeline"])

        if "initial_state" in plan_payload and isinstance(
            plan_payload["initial_state"], dict
        ):
            plan_initial_state = plan_payload["initial_state"]
            self._validate_state(plan_initial_state)
            self.state = {
                "blood_pressure": plan_initial_state["blood_pressure"],
                "infection_burden": plan_initial_state["infection_burden"],
                "kidney_stress": plan_initial_state["kidney_stress"],
                "fluid_overload": plan_initial_state["fluid_overload"],
            }
        else:
            self.state = {
                "blood_pressure": self.default_initial_state["blood_pressure"],
                "infection_burden": self.default_initial_state["infection_burden"],
                "kidney_stress": self.default_initial_state["kidney_stress"],
                "fluid_overload": self.default_initial_state["fluid_overload"],
            }

        self.current_hour = 0
        self.fluid_tokens = []
        self.antibiotic_tokens = []
        self.vasopressor_count = 0
        self.fluid_count = 0
        self.pending_trace_payload = None
        self.pending_result_payload = None`,
            _validate_plan_payload: `    def _validate_plan_payload(self, payload: dict):
        if not isinstance(payload, dict):
            raise ValueError("plan payload must be a dict")
        for required_key in [
            "plan_index",
            "plan_id",
            "action_timeline",
            "initial_state",
        ]:
            if required_key not in payload:
                raise ValueError("missing required key: " + required_key)
        if not isinstance(payload["plan_index"], int):
            raise ValueError("plan_index must be int")
        if not isinstance(payload["plan_id"], str):
            raise ValueError("plan_id must be str")
        if not isinstance(payload["action_timeline"], dict):
            raise ValueError("action_timeline must be dict")
        if not isinstance(payload["initial_state"], dict):
            raise ValueError("initial_state must be dict")

        self._validate_state(payload["initial_state"])

        for hour_key, action_list in payload["action_timeline"].items():
            if not isinstance(hour_key, str):
                raise ValueError("action_timeline hour keys must be str")
            if not hour_key.isdigit():
                raise ValueError("action_timeline hour keys must be integer strings")
            hour_int = int(hour_key)
            if hour_int < 0 or hour_int > self.horizon_hours:
                raise ValueError("action_timeline hour out of range")
            if not isinstance(action_list, list):
                raise ValueError("action_timeline values must be list")
            for action_name in action_list:
                if not isinstance(action_name, str):
                    raise ValueError("action names must be str")
                if action_name not in self.param["allowed_actions"]:
                    raise ValueError("unknown action name: " + action_name)
            if (
                hour_int > self.model_parameters["max_intervention_hour"]
                and len(action_list) > 0
            ):
                raise ValueError(
                    "interventions after max_intervention_hour are not allowed"
                )`,
            _validate_state: `    def _validate_state(self, state_data: dict):
        for required_key in [
            "blood_pressure",
            "infection_burden",
            "kidney_stress",
            "fluid_overload",
        ]:
            if required_key not in state_data:
                raise ValueError("missing state key: " + required_key)
        if state_data["blood_pressure"] not in self.param["blood_pressure_order"]:
            raise ValueError("invalid blood_pressure")
        if state_data["infection_burden"] not in self.param["infection_order"]:
            raise ValueError("invalid infection_burden")
        if state_data["kidney_stress"] not in self.param["kidney_order"]:
            raise ValueError("invalid kidney_stress")
        if not isinstance(state_data["fluid_overload"], bool):
            raise ValueError("fluid_overload must be bool")`,
            _normalize_timeline: `    def _normalize_timeline(self, action_timeline: dict) -> dict:
        normalized = {}
        hour = 0
        while hour <= self.horizon_hours:
            key = str(hour)
            if key in action_timeline:
                normalized[key] = []
                for item in action_timeline[key]:
                    normalized[key].append(item)
            else:
                normalized[key] = []
            hour += 1
        return normalized`,
            _simulate_hour: `    def _simulate_hour(self, hour: int) -> dict:
        actions_applied = []
        for action_name in self.action_timeline.get(str(hour), []):
            actions_applied.append(action_name)

        state_before = {
            "blood_pressure": self.state["blood_pressure"],
            "infection_burden": self.state["infection_burden"],
            "kidney_stress": self.state["kidney_stress"],
            "fluid_overload": self.state["fluid_overload"],
        }

        registered_effects = {
            "new_fluid_tokens": [],
            "new_antibiotic_tokens": [],
            "vasopressor_administered": False,
        }
        kidney_worsening_reasons = []
        notes = []

        vasopressor_immediate = False

        for action_name in actions_applied:
            if action_name == "vasopressor":
                vasopressor_immediate = True
                self.vasopressor_count += 1
                registered_effects["vasopressor_administered"] = True
                notes.append(
                    "vasopressor gives immediate same-hour blood pressure support"
                )
            elif action_name == "iv_fluids":
                self.fluid_count += 1
                start_hour = hour + self.model_parameters["fluid_support_delay_hours"]
                end_hour = (
                    start_hour
                    + self.model_parameters["fluid_support_duration_hours"]
                    - 1
                )
                token = {"start_hour": start_hour, "end_hour": end_hour}
                self.fluid_tokens.append(token)
                registered_effects["new_fluid_tokens"].append(
                    {"start_hour": start_hour, "end_hour": end_hour}
                )
                notes.append("iv_fluids register delayed support token")
            elif action_name == "antibiotic":
                activation_hour = hour + self.model_parameters["antibiotic_delay_hours"]
                token = {"activation_hour": activation_hour}
                self.antibiotic_tokens.append(token)
                registered_effects["new_antibiotic_tokens"].append(
                    {"activation_hour": activation_hour}
                )
                notes.append(
                    "antibiotic registers delayed infection-reduction activation"
                )

        fluid_support_active = 0
        for token in self.fluid_tokens:
            if token["start_hour"] <= hour <= token["end_hour"]:
                fluid_support_active += 1

        antibiotic_effect_active = 0
        for token in self.antibiotic_tokens:
            if token["activation_hour"] <= hour:
                antibiotic_effect_active += 1

        if vasopressor_immediate or fluid_support_active > 0:
            self.state["blood_pressure"] = "stable"
        else:
            self.state["blood_pressure"] = "low"

        infection_steps = antibiotic_effect_active
        while infection_steps > 0:
            self.state["infection_burden"] = self._improve_infection(
                self.state["infection_burden"]
            )
            infection_steps -= 1
        if antibiotic_effect_active > 0:
            notes.append(
                "antibiotic delayed effect is active and reduces infection one step per active token"
            )

        if vasopressor_immediate and self.vasopressor_count >= 2:
            self.state["kidney_stress"] = self._worsen_kidney(
                self.state["kidney_stress"]
            )
            kidney_worsening_reasons.append("repeated_vasopressor_toxicity")
            notes.append("repeated vasopressor exposure worsens kidney stress")

        if (
            self.state["blood_pressure"] == "low"
            and self.state["infection_burden"] == "high"
        ):
            self.state["kidney_stress"] = self._worsen_kidney(
                self.state["kidney_stress"]
            )
            kidney_worsening_reasons.append("low_bp_and_high_infection")
            notes.append(
                "combined low blood pressure and high infection worsens kidney stress"
            )

        if self.fluid_count >= self.param["fluid_overload_threshold"]:
            self.state["fluid_overload"] = True
            notes.append("fluid overload threshold reached and remains true")

        state_after = {
            "blood_pressure": self.state["blood_pressure"],
            "infection_burden": self.state["infection_burden"],
            "kidney_stress": self.state["kidney_stress"],
            "fluid_overload": self.state["fluid_overload"],
        }

        active_effects = {
            "vasopressor_immediate": vasopressor_immediate,
            "fluid_support_active": fluid_support_active,
            "antibiotic_effect_active": antibiotic_effect_active,
        }

        transitions = {
            "blood_pressure": str(state_before["blood_pressure"])
            + "->"
            + str(state_after["blood_pressure"]),
            "infection_burden": str(state_before["infection_burden"])
            + "->"
            + str(state_after["infection_burden"]),
            "kidney_stress": str(state_before["kidney_stress"])
            + "->"
            + str(state_after["kidney_stress"]),
            "fluid_overload": str(state_before["fluid_overload"]).lower()
            + "->"
            + str(state_after["fluid_overload"]).lower(),
        }

        score_if_terminal_now, _ = self._compute_score(state_after)

        trace_payload = {
            "event": "trace",
            "simulation_id": self.simulation_id,
            "plan_id": self.plan_id,
            "hour": hour,
            "actions_applied": actions_applied,
            "state_before": state_before,
            "active_effects": active_effects,
            "transitions": transitions,
            "state_after": state_after,
            "score_if_terminal_now": score_if_terminal_now,
            "registered_effects": registered_effects,
            "kidney_worsening_reasons": kidney_worsening_reasons,
            "cumulative_exposures": {
                "vasopressor_count": self.vasopressor_count,
                "fluid_count": self.fluid_count,
            },
            "notes": notes,
        }
        return trace_payload`,
            _compute_score: `    def _compute_score(self, state_data: dict) -> tuple:
        if state_data["blood_pressure"] == "stable":
            blood_pressure_points = 40
        else:
            blood_pressure_points = 0

        if state_data["infection_burden"] == "low":
            infection_points = 30
        elif state_data["infection_burden"] == "medium":
            infection_points = 15
        else:
            infection_points = 0

        if state_data["kidney_stress"] == "mild":
            kidney_penalty = 0
        elif state_data["kidney_stress"] == "moderate":
            kidney_penalty = 15
        else:
            kidney_penalty = 35

        if state_data["fluid_overload"]:
            fluid_overload_penalty = 10
        else:
            fluid_overload_penalty = 0

        final_score = (
            blood_pressure_points
            + infection_points
            - kidney_penalty
            - fluid_overload_penalty
        )
        breakdown = {
            "blood_pressure_points": blood_pressure_points,
            "infection_points": infection_points,
            "kidney_penalty": kidney_penalty,
            "fluid_overload_penalty": fluid_overload_penalty,
        }
        return final_score, breakdown`,
            _build_plan_result: `    def _build_plan_result(self) -> dict:
        final_state = {
            "blood_pressure": self.state["blood_pressure"],
            "infection_burden": self.state["infection_burden"],
            "kidney_stress": self.state["kidney_stress"],
            "fluid_overload": self.state["fluid_overload"],
        }
        final_score, score_breakdown = self._compute_score(final_state)
        return {
            "plan_id": self.plan_id,
            "final_state": final_state,
            "final_score": final_score,
            "score_breakdown": score_breakdown,
        }`,
            _improve_infection: `    def _improve_infection(self, current_value: str) -> str:
        if current_value == "high":
            return "medium"
        if current_value == "medium":
            return "low"
        return "low"`,
            _worsen_kidney: `    def _worsen_kidney(self, current_value: str) -> str:
        if current_value == "mild":
            return "moderate"
        if current_value == "moderate":
            return "severe"
        return "severe"`,
          },
        },
        {
          id: 'c4',
          label: 'trace_logger',
          modelType: 'atomic',
          x: 620,
          y: 240,
          ports: { in: ['trace_in'], out: [] },
          portsTyped: {
            in: [{ name: 'trace_in', type: 'dict' }],
            out: [],
          },
          file: 'icu_sepsis_treatment_libs/trace_logger.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, simulation_id: str):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier expected in all trace records written to the logger.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "trace_in"))

        self.simulation_id = simulation_id
        self.param = {
            "expected_event": "trace",
            "queue_policy": "preserve_reception_order",
            "simulation_id_must_match": True
        }

        self.trace_queue = []
        self.prepared_trace = None
        self.logged_trace_count = 0

        self.hold_in("IDLE", math.inf)

        self.logger.info(
            {
                "event": "Model Created",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,
            initialize: `    def initialize(self):
        self.trace_queue = []
        self.prepared_trace = None
        self.logged_trace_count = 0
        self.hold_in("IDLE", math.inf)
        self.logger.info(
            {
                "event": "Model Initialized",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,
            lambdaf: `    def lambdaf(self):
        return`,
            deltint: `    def deltint(self):
        old_phase = self.phase
        _ = self.ta()

        if old_phase == "LOG_READY" and self.prepared_trace is not None:
            self.logger.info(self.prepared_trace, log_type="PROCESS")
            self.logged_trace_count += 1
            self.prepared_trace = None

        if len(self.trace_queue) > 0:
            self.prepared_trace = self.trace_queue.pop(0)
            self.hold_in("LOG_READY", 0)
        else:
            self.hold_in("IDLE", math.inf)`,
            deltext: `    def deltext(self, e: float):
        old_phase = self.phase
        remaining = self.ta()

        incoming_traces = list(self.input["trace_in"].values)
        for trace_payload in incoming_traces:
            if isinstance(trace_payload, dict):
                self.trace_queue.append(trace_payload)
            else:
                self.logger.info(
                    {
                        "event": "Trace Rejected",
                        "reason": "non_dict_payload",
                        "simulation_id": self.simulation_id,
                        "model": self.name,
                        "time": get_current_time()
                    },
                    log_type="ERROR"
                )

        if old_phase == "IDLE":
            if self.prepared_trace is None and len(self.trace_queue) > 0:
                self.prepared_trace = self.trace_queue.pop(0)
                self.hold_in("LOG_READY", 0)
            else:
                self.hold_in("IDLE", math.inf)
        elif old_phase == "LOG_READY":
            next_sigma = remaining - e
            if next_sigma < 0:
                next_sigma = 0
            self.hold_in("LOG_READY", next_sigma)
        else:
            if self.prepared_trace is None and len(self.trace_queue) > 0:
                self.prepared_trace = self.trace_queue.pop(0)
                self.hold_in("LOG_READY", 0)
            else:
                self.hold_in("IDLE", math.inf)`,
            exit: `    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "total_logged_traces": self.logged_trace_count,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`,
          },
        },
        {
          id: 'c5',
          label: 'result_aggregator',
          modelType: 'atomic',
          x: 370,
          y: 390,
          ports: { in: ['batch_meta_in', 'plan_result_in'], out: ['result_out'] },
          portsTyped: {
            in: [{ name: 'batch_meta_in', type: 'dict' }, { name: 'plan_result_in', type: 'dict' }],
            out: [{ name: 'result_out', type: 'dict' }],
          },
          file: 'icu_sepsis_treatment_libs/result_aggregator.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, simulation_id: str, horizon_hours: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into the final result payload.
            horizon_hours (int): Batch simulation horizon. Must be 6 for this task.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "batch_meta_in"))
        self.add_in_port(Port(dict, "plan_result_in"))
        self.add_out_port(Port(dict, "result_out"))

        self.simulation_id = simulation_id
        self.horizon_hours = horizon_hours

        self.param = {
            "tie_break_rule": "highest_final_score_then_lexical_ascending_plan_id",
            "duplicate_plan_result_policy": "last_received_value_overwrites_previous_same_plan_id",
            "output_count": 1
        }

        self.batch_meta = None
        self.plan_order = []
        self.plan_count = 0
        self.results_by_plan_id = {}
        self.result_payload = None
        self.result_emitted = False

        self.hold_in("WAITING", float("inf"))

        self.logger.info(
            {
                "event": "Model Created",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,
            initialize: `    def initialize(self):
        self.batch_meta = None
        self.plan_order = []
        self.plan_count = 0
        self.results_by_plan_id = {}
        self.result_payload = None
        self.result_emitted = False

        self.hold_in("WAITING", float("inf"))

        self.logger.info(
            {
                "event": "Model Initialized",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,
            _is_ready_to_emit: `    def _is_ready_to_emit(self) -> bool:
        if self.result_emitted:
            return False
        if self.batch_meta is None:
            return False
        if self.plan_count < 0:
            return False
        if len(self.results_by_plan_id) != self.plan_count:
            return False
        for plan_id in self.plan_order:
            if plan_id not in self.results_by_plan_id:
                return False
        return True`,
            _select_best_plan_id: `    def _select_best_plan_id(self, ordered_plans: list) -> str:
        best_plan_id = ""
        best_score = None
        for plan in ordered_plans:
            current_plan_id = plan["plan_id"]
            current_score = plan["final_score"]
            if best_score is None:
                best_score = current_score
                best_plan_id = current_plan_id
            else:
                if current_score > best_score:
                    best_score = current_score
                    best_plan_id = current_plan_id
                elif current_score == best_score and current_plan_id < best_plan_id:
                    best_plan_id = current_plan_id
        return best_plan_id`,
            _build_result_payload: `    def _build_result_payload(self) -> dict:
        ordered_plans = []
        for plan_id in self.plan_order:
            plan_result = self.results_by_plan_id[plan_id]
            ordered_plans.append(
                {
                    "plan_id": plan_result["plan_id"],
                    "final_state": {
                        "blood_pressure": plan_result["final_state"]["blood_pressure"],
                        "infection_burden": plan_result["final_state"]["infection_burden"],
                        "kidney_stress": plan_result["final_state"]["kidney_stress"],
                        "fluid_overload": plan_result["final_state"]["fluid_overload"]
                    },
                    "final_score": plan_result["final_score"],
                    "score_breakdown": {
                        "blood_pressure_points": plan_result["score_breakdown"]["blood_pressure_points"],
                        "infection_points": plan_result["score_breakdown"]["infection_points"],
                        "kidney_penalty": plan_result["score_breakdown"]["kidney_penalty"],
                        "fluid_overload_penalty": plan_result["score_breakdown"]["fluid_overload_penalty"]
                    }
                }
            )

        best_plan_id = self._select_best_plan_id(ordered_plans)

        return {
            "event": "result",
            "simulation_id": self.simulation_id,
            "horizon_hours": self.horizon_hours,
            "plans": ordered_plans,
            "best_plan_id": best_plan_id
        }`,
            lambdaf: `    def lambdaf(self):
        if self.phase == "EMIT_RESULT" and self.result_payload is not None and not self.result_emitted:
            self.output["result_out"].add(self.result_payload)`,
            deltint: `    def deltint(self):
        if self.phase == "EMIT_RESULT":
            self.result_emitted = True
            self.logger.info(self.result_payload, log_type="RESULT")
            self.logger.info(
                {
                    "event": "Final Result Emitted",
                    "simulation_id": self.simulation_id,
                    "result": self.result_payload,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )
            self.hold_in("DONE", float("inf"))
        else:
            self.hold_in(self.phase, float("inf"))`,
            deltext: `    def deltext(self, e: float):
        current_phase = self.phase
        current_sigma = self.ta()

        if current_phase == "DONE":
            self.hold_in("DONE", float("inf"))
            return

        for meta in self.input["batch_meta_in"].values:
            self.batch_meta = {
                "plan_order": [plan_id for plan_id in meta["plan_order"]],
                "plan_count": meta["plan_count"],
                "horizon_hours": meta["horizon_hours"]
            }
            self.plan_order = [plan_id for plan_id in meta["plan_order"]]
            self.plan_count = meta["plan_count"]

            self.logger.info(
                {
                    "event": "Batch Metadata Received",
                    "simulation_id": self.simulation_id,
                    "batch_meta": self.batch_meta,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )

        for plan_result in self.input["plan_result_in"].values:
            stored_result = {
                "plan_id": plan_result["plan_id"],
                "final_state": {
                    "blood_pressure": plan_result["final_state"]["blood_pressure"],
                    "infection_burden": plan_result["final_state"]["infection_burden"],
                    "kidney_stress": plan_result["final_state"]["kidney_stress"],
                    "fluid_overload": plan_result["final_state"]["fluid_overload"]
                },
                "final_score": plan_result["final_score"],
                "score_breakdown": {
                    "blood_pressure_points": plan_result["score_breakdown"]["blood_pressure_points"],
                    "infection_points": plan_result["score_breakdown"]["infection_points"],
                    "kidney_penalty": plan_result["score_breakdown"]["kidney_penalty"],
                    "fluid_overload_penalty": plan_result["score_breakdown"]["fluid_overload_penalty"]
                }
            }
            self.results_by_plan_id[stored_result["plan_id"]] = stored_result

            self.logger.info(
                {
                    "event": "Plan Result Received",
                    "simulation_id": self.simulation_id,
                    "plan_result": stored_result,
                    "collected_result_count": len(self.results_by_plan_id),
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )

        if self._is_ready_to_emit():
            self.result_payload = self._build_result_payload()
            self.logger.info(
                {
                    "event": "Final Result Prepared",
                    "simulation_id": self.simulation_id,
                    "result": self.result_payload,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )
            self.hold_in("EMIT_RESULT", 0)
        else:
            if math.isinf(current_sigma):
                self.hold_in("WAITING", float("inf"))
            else:
                remaining = current_sigma - e
                if remaining < 0:
                    remaining = 0
                self.hold_in(current_phase, remaining)`,
            exit: `    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "metadata_received": self.batch_meta is not None,
                "expected_plan_count": self.plan_count,
                "collected_plan_count": len(self.results_by_plan_id),
                "result_emitted": self.result_emitted,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`,
          },
        },
        {
          id: 'c6',
          label: 'result_logger',
          modelType: 'atomic',
          x: 620,
          y: 390,
          ports: { in: ['result_in'], out: [] },
          portsTyped: {
            in: [{ name: 'result_in', type: 'dict' }],
            out: [],
          },
          file: 'icu_sepsis_treatment_libs/result_logger.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, simulation_id: str):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier expected in the final result record.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "result_in"))

        self.simulation_id = simulation_id
        self.param = {
            "expects_event": "result",
            "allow_multiple_results": False
        }

        self.pending_result = None
        self.logged_result_count = 0

        self.hold_in("WAITING", math.inf)

        self.logger.info(
            {
                "event": "Model Created",
                "simulation_id": self.simulation_id,
                "param": self.param
            },
            log_type="PROCESS"
        )`,
            initialize: `    def initialize(self):
        self.pending_result = None
        self.logged_result_count = 0
        self.hold_in("WAITING", math.inf)
        self.logger.info(
            {
                "event": "Model Initialized",
                "simulation_id": self.simulation_id
            },
            log_type="PROCESS"
        )`,
            lambdaf: `    def lambdaf(self):
        return`,
            deltint: `    def deltint(self):
        old_phase = self.phase
        _ = self.ta()

        if old_phase == "LOG_READY" and self.pending_result is not None:
            self.logger.info(self.pending_result, log_type="RESULT")
            self.logged_result_count += 1
            self.pending_result = None

        self.hold_in("WAITING", math.inf)`,
            deltext: `    def deltext(self, e: float):
        old_phase = self.phase
        remaining = self.ta()

        incoming_results = list(self.input["result_in"].values)

        if len(incoming_results) == 0:
            if math.isinf(remaining):
                self.hold_in(old_phase, math.inf)
            else:
                self.hold_in(old_phase, max(0.0, remaining - e))
            return

        selected_result = incoming_results[0]

        if self.logged_result_count >= 1 and not self.param["allow_multiple_results"]:
            self.logger.info(
                {
                    "event": "Duplicate Result Ignored",
                    "simulation_id": self.simulation_id
                },
                log_type="ERROR"
            )
            self.hold_in("WAITING", math.inf)
            return

        self.pending_result = {
            "event": selected_result["event"],
            "simulation_id": selected_result["simulation_id"],
            "horizon_hours": selected_result["horizon_hours"],
            "plans": selected_result["plans"],
            "best_plan_id": selected_result["best_plan_id"]
        }

        self.hold_in("LOG_READY", 0.0)`,
            exit: `    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "logged_result_count": self.logged_result_count,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`,
          },
        },
      ],
      edges: [
        ['c1', 'c2', 'contains'],
        ['c1', 'c3', 'contains'],
        ['c1', 'c4', 'contains'],
        ['c1', 'c5', 'contains'],
        ['c1', 'c6', 'contains'],
        ['c2', 'c3', 'plan_out'],
        ['c3', 'c2', 'plan_result_out -> plan_result_in'],
        ['c2', 'c5', 'batch_meta_out / plan_result_out'],
        ['c3', 'c4', 'trace_out -> trace_in'],
        ['c5', 'c6', 'result_out -> result_in'],
      ],
      groups: [
        { members: ['c2', 'c3', 'c4', 'c5', 'c6'], label: 'children of icu_sepsis_treatment (coupled containment)' },
      ],
    },
    eval: [
      'Direct run (outputs_v54_icu) selected Plan 2 as final decision.',
      'Model-assisted run (outputs_v54_icu) selected Plan 3 based on executable result evidence.',
      'This case demonstrates how executable model feedback can materially change final reasoning output.',
    ],
    evalFlow: [
      {
        id: 'u1',
        step: 'Step 1',
        title: 'Task Prompt and Baseline Reasoning',
        paperStep: 'Paper Mapping: Problem statement and direct inference baseline',
        artifact: 'outputs_v54_icu/scene_1_direct_answer.md',
        result: 'Direct run (no tool): model chose Plan 2 as unique winner from narrative reasoning.',
      },
      {
        id: 'u2',
        step: 'Step 2',
        title: 'LLM to DEVS Spec Packaging',
        paperStep: 'Paper Mapping: World-model specification synthesis',
        artifact: 'outputs_v54_icu/scene_1_spec.yaml',
        result: 'LLM-generated model spec was normalized into benchmark-style YAML and used to construct executable DEVS code.',
      },
      {
        id: 'u3',
        step: 'Step 3',
        title: 'Executable DEVS Construction and Run',
        paperStep: 'Paper Mapping: Transition-system execution over explicit states',
        artifact: 'working_dirs/scene1_gen_v3/tasks/icu_sepsis_treatment/devs_project/run_icu_sepsis_treatment.py',
        result: 'Simulation emitted plan_final and plan_comparison logs with scores plan_1=-35, plan_2=-5, plan_3=15, yielding unique best plan_3.',
      },
      {
        id: 'u4',
        step: 'Step 4',
        title: 'Tool-assisted Re-Reasoning',
        paperStep: 'Paper Mapping: Model-in-the-loop decision refinement',
        artifact: 'outputs_v54_icu/scene_1_assisted_answer.md',
        result: 'After consuming tool evidence, the assisted run changed final decision from Plan 2 to Plan 3.',
      },
    ],
    interactive: null,
  },
  {
    id: 'wetlab',
    title: 'Wet-Lab Case',
    tag: 'A constructed workflow demo case.',
    inputText: WETLAB_INPUT,
    sources: {
      input: 'devs_reasoning_app/inputs/scene2_hard_v4.md',
      plan: 'devs_reasoning_app/outputs_v4/scene_2_spec.yaml',
      code: 'devs_reasoning_app/working_dirs/scene2_gen_v3/tasks/wet_lab_assay_scheduling/devs_project/',
      eval: 'devs_reasoning_app/outputs_v5/scene_2_assisted_answer.md + outputs_v5_gpt41/scene_2_direct_answer.md + outputs_v5_gpt4omini/scene_2_direct_answer.md',
    },
    planTree: {
      id: 'wetlab-root',
      name: 'wet_lab_assay_scheduling',
      type: 'coupled',
      summary: 'Batch schedule ingestion + deterministic lab transition + completion scoring',
      initArgs: ['horizon', 'samples'],
      initArgsTyped: [
        { name: 'horizon', type: 'int' },
        { name: 'samples', type: 'list[str]' },
      ],
      ports: { input: ['episode_request'], output: ['episode_result'] },
      portsTyped: {
        input: [{ name: 'episode_request', type: 'dict' }],
        output: [{ name: 'episode_result', type: 'dict' }],
      },
      details: {
        function:
          'Root model accepts one fixed strategy timeline payload, simulates hourly transitions with delayed biosafety lockout, and outputs composite scoring evidence.',
        logging:
          'Key logs: hour_state and final result with completed_sample_ids_by_deadline, prep_bonus, composite_score, invalid_action_count.',
        schemas:
          'episode_request:{horizon,samples,action_timeline} -> episode_result:{completed_samples_by_deadline,prep_bonus,composite_score,invalid_action_count}',
      },
      children: [
        {
          id: 'wetlab-ingest',
          name: 'schedule_ingestor',
          type: 'atomic',
          summary: 'Normalizes timeline into deterministic hour packets',
          initArgs: ['horizon'],
          initArgsTyped: [{ name: 'horizon', type: 'int' }],
          ports: { input: ['episode_request'], output: ['hour_packet'] },
          portsTyped: {
            input: [{ name: 'episode_request', type: 'dict' }],
            output: [{ name: 'hour_packet', type: 'dict' }],
          },
          details: {
            function: 'Converts full timeline into hour=0..horizon packets with stable ordering.',
            logging: 'No business scoring; orchestration only.',
            schemas: 'episode_request -> hour_packet:{episode_id,hour,actions}',
          },
          children: [],
        },
        {
          id: 'wetlab-trans',
          name: 'lab_transition',
          type: 'atomic',
          summary: 'Applies resource constraints and stage prerequisites hour by hour',
          initArgs: ['horizon', 'samples'],
          initArgsTyped: [
            { name: 'horizon', type: 'int' },
            { name: 'samples', type: 'list[str]' },
          ],
          ports: { input: ['hour_packet'], output: ['final_state'] },
          portsTyped: {
            input: [{ name: 'hour_packet', type: 'dict' }],
            output: [{ name: 'final_state', type: 'dict' }],
          },
          details: {
            function:
              'Processes completion-before-action semantics, updates sample lifecycle states, and enforces delayed lockout (prep allowed at incubation start hour, blocked at next hour).',
            logging: 'Emits hour_state traces with per-sample stage status.',
            schemas: 'hour_packet -> final_state:{sample_stage,stage_times,invalid_action_count}',
          },
          children: [],
        },
        {
          id: 'wetlab-score',
          name: 'lab_result',
          type: 'atomic',
          summary: 'Scores completed assays by deadline',
          initArgs: ['horizon'],
          initArgsTyped: [{ name: 'horizon', type: 'int' }],
          ports: { input: ['final_state'], output: ['episode_result'] },
          portsTyped: {
            input: [{ name: 'final_state', type: 'dict' }],
            output: [{ name: 'episode_result', type: 'dict' }],
          },
          details: {
            function: 'Computes completed_by_8, prep_bonus, and composite_score=10*completed+prep_bonus; tie-break uses invalid actions.',
            logging: 'Emits result.',
            schemas: 'final_state -> episode_result:{completed_samples_by_deadline,prep_bonus,composite_score,invalid_action_count}',
          },
          children: [],
        },
      ],
    },
    codeGraph: {
      nodes: [
        {
          id: 'w1',
          label: 'wet_lab_assay_scheduling (coupled)',
          modelType: 'coupled',
          x: 420,
          y: 70,
          ports: { in: ['episode_request'], out: ['episode_result'] },
          portsTyped: {
            in: [{ name: 'episode_request', type: 'dict' }],
            out: [{ name: 'episode_result', type: 'dict' }],
          },
          file: 'wet_lab_assay_scheduling.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        horizon: int = 8,
        samples: list | None = None,
    ):
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "episode_request"))
        self.add_out_port(Port(dict, "episode_result"))

        ingestor = schedule_ingestor("schedule_ingestor", self, horizon=int(horizon))
        transition = lab_transition(
            "lab_transition", self, horizon=int(horizon), samples=samples
        )
        scorer = lab_result("lab_result", self, horizon=int(horizon))

        self.add_component(ingestor)
        self.add_component(transition)
        self.add_component(scorer)

        self.add_coupling(
            self.input["episode_request"], ingestor.input["episode_request"]
        )
        self.add_coupling(
            ingestor.output["hour_packet"], transition.input["hour_packet"]
        )
        self.add_coupling(transition.output["final_state"], scorer.input["final_state"])
        self.add_coupling(
            scorer.output["episode_result"], self.output["episode_result"]
        )

        self.logger.info(
            {
                "event": "model_created",
                "model": self.name,
                "mode": "batch_stdin",
                "decomposition": ["schedule_ingestor", "lab_transition", "lab_result"],
            },
            log_type="PROCESS",
        )`,
          },
        },
        {
          id: 'w2',
          label: 'schedule_ingestor',
          modelType: 'atomic',
          x: 190,
          y: 260,
          ports: { in: ['episode_request'], out: ['hour_packet'] },
          portsTyped: {
            in: [{ name: 'episode_request', type: 'dict' }],
            out: [{ name: 'hour_packet', type: 'dict' }],
          },
          file: 'wet_lab_assay_scheduling_libs/schedule_ingestor.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, horizon: int = 8):
        super().__init__(name)
        self.parent = parent
        self.horizon = int(horizon)

        self.add_in_port(Port(dict, "episode_request"))
        self.add_out_port(Port(dict, "hour_packet"))

        self.episode_id = "episode_0"
        self.schedule = {}
        self.cursor = 0
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,
            initialize: `    def initialize(self):
        self.episode_id = "episode_0"
        self.schedule = {}
        self.cursor = 0
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,
            deltext: `    def deltext(self, e: float):
        _ = e
        incoming = list(self.input["episode_request"].values)
        if not incoming:
            return
        req = incoming[-1]
        self.episode_id = str(req.get("episode_id", "episode_0"))
        self.schedule = {}
        for block in req.get("action_timeline", []):
            h = int(block.get("hour", -1))
            if h < 0 or h > self.horizon:
                continue
            actions = block.get("actions", [])
            if isinstance(actions, list):
                self.schedule[h] = list(actions)
        self.cursor = 0
        self.pending = {
            "episode_id": self.episode_id,
            "hour": 0,
            "actions": self.schedule.get(0, []),
        }
        self.hold_in("EMIT", 0.0)`,
            lambdaf: `    def lambdaf(self):
        if self.phase == "EMIT" and self.pending is not None:
            self.output["hour_packet"].add(self.pending)`,
            deltint: `    def deltint(self):
        if self.phase != "EMIT":
            self.hold_in("IDLE", float("inf"))
            return
        if self.cursor >= self.horizon:
            self.pending = None
            self.hold_in("IDLE", float("inf"))
            return
        self.cursor += 1
        self.pending = {
            "episode_id": self.episode_id,
            "hour": self.cursor,
            "actions": self.schedule.get(self.cursor, []),
        }
        self.hold_in("EMIT", 1.0)`,
            exit: `    def exit(self):
        return`,
          },
        },
        {
          id: 'w3',
          label: 'lab_transition',
          modelType: 'atomic',
          x: 420,
          y: 260,
          ports: { in: ['hour_packet'], out: ['final_state'] },
          portsTyped: {
            in: [{ name: 'hour_packet', type: 'dict' }],
            out: [{ name: 'final_state', type: 'dict' }],
          },
          file: 'wet_lab_assay_scheduling_libs/lab_transition.py',
                    methods: {
            __init__: `    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        horizon: int = 8,
        samples: list | None = None,
    ):
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)
        self.horizon = int(horizon)
        self.samples = list(samples or ["X", "Y", "Z"])

        self.add_in_port(Port(dict, "hour_packet"))
        self.add_out_port(Port(dict, "final_state"))

        self.pending = None
        self.hold_in("IDLE", float("inf"))
        self._reset_episode("episode_0")`,
            _reset_episode: `    def _reset_episode(self, episode_id: str):
        self.episode_id = episode_id
        self.sample_stage = {s: "not_started" for s in self.samples}
        self.stage_times = {
            s: {
                "preparation_start": None,
                "preparation_end": None,
                "incubation_start": None,
                "incubation_end": None,
                "assay_start": None,
                "assay_end": None,
            }
            for s in self.samples
        }
        self.resources = {
            "technician": {"busy_until": -1, "sample": "", "start_hour": -1},
            "incubator": {"busy_until": -1, "sample": "", "start_hour": -1},
            "assay_machine": {"busy_until": -1, "sample": "", "start_hour": -1},
        }
        self.invalid = 0`,
            initialize: `    def initialize(self):
        self.pending = None
        self._reset_episode("episode_0")
        self.hold_in("IDLE", float("inf"))`,
            _release_completed: `    def _release_completed(self, hour: int):
        for r in ["technician", "incubator", "assay_machine"]:
            if self.resources[r]["busy_until"] == hour:
                self.resources[r]["busy_until"] = -1
                self.resources[r]["sample"] = ""
                self.resources[r]["start_hour"] = -1`,
            _start: `    def _start(self, sample: str, stage: str, hour: int, duration: int, resource: str):
        self.resources[resource]["busy_until"] = hour + duration
        self.resources[resource]["sample"] = sample
        self.resources[resource]["start_hour"] = hour
        self.stage_times[sample][f"{stage}_start"] = hour
        self.stage_times[sample][f"{stage}_end"] = hour + duration
        if stage == "preparation":
            self.sample_stage[sample] = "preparing"
        elif stage == "incubation":
            self.sample_stage[sample] = "incubating"
        else:
            self.sample_stage[sample] = "assaying"`,
            _apply_stage_completions: `    def _apply_stage_completions(self, hour: int):
        for s in self.samples:
            if (
                self.sample_stage[s] == "preparing"
                and self.stage_times[s]["preparation_end"] == hour
            ):
                self.sample_stage[s] = "prepared_waiting"
            if (
                self.sample_stage[s] == "incubating"
                and self.stage_times[s]["incubation_end"] == hour
            ):
                self.sample_stage[s] = "incubated_waiting"
            if (
                self.sample_stage[s] == "assaying"
                and self.stage_times[s]["assay_end"] == hour
            ):
                self.sample_stage[s] = "completed"`,
            _try_action: `    def _try_action(self, action: dict, hour: int):
        at = str(action.get("type", ""))
        sample = str(action.get("sample", ""))
        if sample not in self.sample_stage:
            self.invalid += 1
            return

        if at == "start_preparation":
            incubator_busy = self.resources["incubator"]["busy_until"] > hour
            incubator_started = int(self.resources["incubator"].get("start_hour", -1))
            second_hour_lockout = (
                incubator_busy
                and incubator_started >= 0
                and hour >= incubator_started + 1
            )
            if (
                self.sample_stage[sample] != "not_started"
                or self.resources["technician"]["busy_until"] > hour
                or second_hour_lockout
            ):
                self.invalid += 1
                return
            self._start(sample, "preparation", hour, 1, "technician")
            return

        if at == "start_incubation":
            if (
                self.sample_stage[sample] != "prepared_waiting"
                or self.resources["incubator"]["busy_until"] > hour
            ):
                self.invalid += 1
                return
            self._start(sample, "incubation", hour, 2, "incubator")
            return

        if at == "start_assay":
            if (
                self.sample_stage[sample] != "incubated_waiting"
                or self.resources["assay_machine"]["busy_until"] > hour
            ):
                self.invalid += 1
                return
            self._start(sample, "assay", hour, 1, "assay_machine")
            return

        self.invalid += 1`,
            deltext: `    def deltext(self, e: float):
        _ = e
        for packet in self.input["hour_packet"].values:
            episode_id = str(packet["episode_id"])
            hour = int(packet["hour"])
            if episode_id != self.episode_id:
                self._reset_episode(episode_id)

            self._release_completed(hour)
            self._apply_stage_completions(hour)

            actions = packet.get("actions", [])
            for action in actions:
                self._try_action(action, hour)

            self.logger.info(
                {
                    "event": "hour_state",
                    "episode_id": self.episode_id,
                    "hour": hour,
                    "sample_stage": dict(self.sample_stage),
                    "invalid_action_count": self.invalid,
                },
                log_type="PROCESS",
            )

            if hour >= self.horizon:
                self.pending = {
                    "episode_id": self.episode_id,
                    "horizon": self.horizon,
                    "sample_stage": dict(self.sample_stage),
                    "stage_times": self.stage_times,
                    "invalid_action_count": self.invalid,
                }
                self.hold_in("EMIT", 0.0)`,
            lambdaf: `    def lambdaf(self):
        if self.phase == "EMIT" and self.pending is not None:
            self.output["final_state"].add(self.pending)`,
            deltint: `    def deltint(self):
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,
            exit: `    def exit(self):
        return`,
          },
        },
        {
          id: 'w4',
          label: 'lab_result',
          modelType: 'atomic',
          x: 650,
          y: 260,
          ports: { in: ['final_state'], out: ['episode_result'] },
          portsTyped: {
            in: [{ name: 'final_state', type: 'dict' }],
            out: [{ name: 'episode_result', type: 'dict' }],
          },
          file: 'wet_lab_assay_scheduling_libs/lab_result.py',
                    methods: {
            __init__: `    def __init__(self, name: str, parent: Coupled | None, horizon: int = 8):
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)
        self.horizon = int(horizon)

        self.add_in_port(Port(dict, "final_state"))
        self.add_out_port(Port(dict, "episode_result"))
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,
            initialize: `    def initialize(self):
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,
            deltext: `    def deltext(self, e: float):
        _ = e
        for msg in self.input["final_state"].values:
            completed = []
            prep_bonus_ids = []
            for s, times in msg["stage_times"].items():
                assay_end = times.get("assay_end")
                if isinstance(assay_end, (int, float)) and assay_end <= self.horizon:
                    completed.append(s)

                prep_end = times.get("preparation_end")
                if isinstance(prep_end, (int, float)) and prep_end <= 3:
                    prep_bonus_ids.append(s)

            completed_count = len(completed)
            prep_bonus = len(prep_bonus_ids)
            invalid_count = int(msg.get("invalid_action_count", 0))
            composite_score = 10 * completed_count + prep_bonus

            self.pending = {
                "event": "result",
                "episode_id": msg["episode_id"],
                "completed_samples_by_deadline": completed_count,
                "completed_sample_ids_by_deadline": sorted(completed),
                "prep_bonus": prep_bonus,
                "prep_bonus_sample_ids": sorted(prep_bonus_ids),
                "score_formula": "composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count",
                "composite_score": composite_score,
                "score": composite_score,
                "invalid_action_count": invalid_count,
                "overall_valid": invalid_count == 0,
                "per_sample_final_status": msg["sample_stage"],
                "per_sample_stage_times": msg["stage_times"],
                "horizon": self.horizon,
            }
            self.logger.info(self.pending, log_type="RESULT")
            self.hold_in("EMIT", 0.0)`,
            lambdaf: `    def lambdaf(self):
        if self.phase == "EMIT" and self.pending is not None:
            self.output["episode_result"].add(self.pending)`,
            deltint: `    def deltint(self):
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,
            exit: `    def exit(self):
        return`,
          },
        },
      ],
      edges: [
        ['w1', 'w2', 'contains'],
        ['w1', 'w3', 'contains'],
        ['w1', 'w4', 'contains'],
        ['w2', 'w3', 'hour_packet'],
        ['w3', 'w4', 'final_state'],
        ['w4', 'w1', 'episode_result'],
      ],
      groups: [{ members: ['w2', 'w3', 'w4'], label: 'children of wet_lab_assay_scheduling' }],
    },
    eval: [
      'Direct run (outputs_v4) reported Strategy C as final decision.',
      'DEVS-assisted run (outputs_v4) executed fixed scripts A/B/C and selected Strategy B from composite score evidence.',
      'This case demonstrates text-only reasoning failure on subtle legality + scoring rules, corrected by executable simulation.',
    ],
    evalFlow: [
      {
        id: 'w-u1',
        step: 'Step 1',
        title: 'Task Prompt and Baseline Reasoning',
        paperStep: 'Paper Mapping: direct inference baseline',
        artifact: 'outputs_v4/scene_2_direct_answer.md',
        result: 'Direct baseline gave final decision Strategy C (incorrect under executable scoring).',
      },
      {
        id: 'w-u2',
        step: 'Step 2',
        title: 'LLM to DEVS Spec Packaging',
        paperStep: 'Paper Mapping: world-model specification synthesis',
        artifact: 'outputs_v4/scene_2_spec.yaml',
        result: 'Spec encodes delayed lockout legality and composite scoring formula for fixed candidate scripts.',
      },
      {
        id: 'w-u3',
        step: 'Step 3',
        title: 'Executable DEVS Construction and Run',
        paperStep: 'Paper Mapping: transition-system execution',
        artifact: 'working_dirs/scene2_gen_v3/tasks/wet_lab_assay_scheduling/devs_project/run_wet_lab_assay_scheduling.py',
        result: 'Executable runs produced A=21, B=23, C=22 composite scores (B best).',
      },
      {
        id: 'w-u4',
        step: 'Step 4',
        title: 'Tool-assisted Re-Reasoning',
        paperStep: 'Paper Mapping: model-in-the-loop correction',
        artifact: 'outputs_v4/scene_2_assisted_answer.md',
        result: 'After tool evidence, final decision switches to Strategy B.',
      },
    ],
    interactive: null,
  },
]

const VISIBLE_CASES = CASES

const BENCHMARK_CASE_ID = 'sa'

const defaultTreeOpen = {
  'sa-root': true,
  'sa-ops': true,
  'sa-fleet': true,
  'sa-aircraft-unit-template': true,
  'sa-aircraft-mission': true,
  'sa-aircraft-mission-sm': true,
  'sa-aircraft-mission-log': true,
  'icu-root': true,
  'icu-sim': true,
  'wetlab-root': true,
}

function findTreeNode(node, id) {
  if (node.id === id) return node
  for (const child of node.children) {
    const got = findTreeNode(child, id)
    if (got) return got
  }
  return null
}

function findGraphNode(nodes, id) {
  return nodes.find((n) => n.id === id) || null
}

const PAPER_METHOD_META = {
  ta: {
    paperName: 'ta(s) Time Advance',
    intro: 'Defines the time until the next internal transition from current state s.',
  },
  deltint: {
    paperName: 'delta_int(s) Internal Transition',
    intro: 'State update when scheduled internal event fires.',
  },
  deltext: {
    paperName: 'delta_ext(s, e, x) External Transition',
    intro: 'State update on external input x after elapsed time e.',
  },
  lambdaf: {
    paperName: 'lambda(s) Output Function',
    intro: 'Computes outputs emitted just before internal transition.',
  },
  deltconf: {
    paperName: 'delta_con(s, x) Confluent Transition',
    intro: 'Conflict resolution when external and internal events coincide.',
  },
  __init__: {
    paperName: 'Model Constructor / Coupling Definition',
    intro: 'Declares ports, init args, and (for coupled models) wiring relations.',
  },
  initialize: {
    paperName: 'Initialization Routine',
    intro: 'Resets model state and schedules initial phase before simulation starts.',
  },
  exit: {
    paperName: 'Finalization Routine',
    intro: 'Final cleanup/final logging hook after simulation completes.',
  },
}

const XDEVS_DEFAULTS = {
  ta: `def ta(self) -> float:\n    return self.sigma`,
  deltconf: `def deltcon(self):\n    \"\"\"Confluent transitions of the atomic model. By default, internal transition is triggered first.\"\"\"\n    self.deltint()\n    self.deltext(0)`,
}

function getMethodViews(node) {
  const methods = node?.methods || {}
  const ordered = ['__init__', 'initialize', 'ta', 'deltint', 'deltext', 'lambdaf', 'deltconf', 'exit']
  const presentOrdered = ordered.filter((name) => Object.prototype.hasOwnProperty.call(methods, name))
  const extras = Object.keys(methods).filter((name) => !ordered.includes(name))
  const names = [...presentOrdered, ...extras]

  return names.map((name) => {
    const raw = methods[name]
    const meta = PAPER_METHOD_META[name] || {
      paperName: 'Helper / Internal Method',
      intro: 'Project-specific helper used by DEVS transitions or output logic.',
    }
    if (typeof raw === 'string') {
      return {
        name,
        paperName: meta.paperName,
        intro: meta.intro,
        code: raw,
      }
    }
    return {
      name,
      paperName: raw.paperName || meta.paperName,
      intro: raw.intro || meta.intro,
      code: raw.code || '',
    }
  })
}

function normalizeBlockIndent(text = '') {
  const lines = String(text).split('\n')
  const nonEmpty = lines.filter((line) => line.trim().length > 0)
  if (nonEmpty.length === 0) return ''
  const minIndent = Math.min(...nonEmpty.map((line) => (line.match(/^ */)?.[0].length ?? 0)))
  return lines.map((line) => line.slice(Math.min(minIndent, line.length))).join('\n').trim()
}

function splitAbpInputText(inputText = '') {
  const m = String(inputText).match(/general:\s*\|\n([\s\S]*?)\n\s*scenario:\s*\|\n([\s\S]*?)\n\s*args_input_output:\s*\|\n([\s\S]*)$/)
  if (!m) {
    return {
      general: String(inputText).trim(),
      scenario: '',
      interface: '',
    }
  }
  return {
    general: normalizeBlockIndent(m[1]),
    scenario: normalizeBlockIndent(m[2]),
    interface: normalizeBlockIndent(m[3]),
  }
}

function withUnknownType(items = []) {
  return items.map((x) => (typeof x === 'string' ? { name: x, type: '?' } : x))
}

function initAi2InteractiveState() {
  return {
    t: 0,
    agentHolding: null,
    objects: {
      mug_1: { parent: 'counter', held: false },
      apple_1: { parent: 'fridge_1', held: false },
    },
    receptacles: {
      drawer_1: { open: false, goalOpen: false },
      fridge_1: { open: true, goalOpen: false },
    },
    goals: {
      mug_1: 'drawer_1',
      apple_1: 'fridge_1',
    },
    logs: [],
  }
}

export default function App() {
  const [topTab, setTopTab] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash === 'usage' || hash === 'icu' || hash === 'wetlab') return 'workflow'
    return 'benchmark'
  })
  const [activeCaseId, setActiveCaseId] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash === 'icu') return 'icu'
    if (hash === 'wetlab') return 'wetlab'
    return BENCHMARK_CASE_ID
  })
  const activeCase = useMemo(
    () => VISIBLE_CASES.find((c) => c.id === activeCaseId) ?? VISIBLE_CASES[0],
    [activeCaseId]
  )

  const benchmarkInputSections = useMemo(
    () => (activeCase.id === BENCHMARK_CASE_ID ? SA_INPUT_SECTIONS : splitAbpInputText(activeCase.inputText)),
    [activeCase]
  )

  const tabCases = useMemo(() => {
    if (topTab === 'benchmark') return VISIBLE_CASES.filter((c) => c.id === BENCHMARK_CASE_ID)
    if (topTab === 'workflow') return VISIBLE_CASES.filter((c) => c.id === 'wetlab' || c.id === 'icu')
    return []
  }, [topTab])

  const [openTree, setOpenTree] = useState(defaultTreeOpen)
  const [selectedTreeNodeId, setSelectedTreeNodeId] = useState(
    CASES.find((c) => c.id === BENCHMARK_CASE_ID)?.planTree?.id || 'abp-root'
  )
  const [selectedCodeNodeId, setSelectedCodeNodeId] = useState('n1')

  useEffect(() => {
    if (topTab === 'benchmark' && activeCaseId !== BENCHMARK_CASE_ID) {
      setActiveCaseId(BENCHMARK_CASE_ID)
      return
    }
    if (topTab === 'workflow' && activeCaseId !== 'wetlab' && activeCaseId !== 'icu') {
      setActiveCaseId('wetlab')
    }
  }, [topTab, activeCaseId])

  useEffect(() => {
    setSelectedTreeNodeId(activeCase.planTree.id)
    setSelectedCodeNodeId(activeCase.codeGraph.nodes[0].id)
  }, [activeCaseId, activeCase])

  const selectedTreeNode = useMemo(
    () => findTreeNode(activeCase.planTree, selectedTreeNodeId) ?? activeCase.planTree,
    [activeCase, selectedTreeNodeId]
  )

  const selectedCodeNode = useMemo(
    () => findGraphNode(activeCase.codeGraph.nodes, selectedCodeNodeId) ?? activeCase.codeGraph.nodes[0],
    [activeCase, selectedCodeNodeId]
  )

  const benchmarkEvalAsset = useMemo(
    () => (activeCase.id === BENCHMARK_CASE_ID ? activeCase.evalFlow.find((s) => s.id === 's1') ?? null : null),
    [activeCase]
  )

  const benchmarkEvalProcess = useMemo(
    () => (activeCase.id === BENCHMARK_CASE_ID ? activeCase.evalFlow.filter((s) => s.id !== 's1') : []),
    [activeCase]
  )

  const runAi2Command = (cmd) => {
    setAi2State((s) => {
      if (cmd === 'reset') return initAi2InteractiveState()
      const n = structuredClone(s)
      n.t += 1
      let ok = true
      let error = null
      const mug = n.objects.mug_1

      if (cmd === 'open_drawer') n.receptacles.drawer_1.open = true
      if (cmd === 'close_fridge') n.receptacles.fridge_1.open = false
      if (cmd === 'pickup_mug') {
        if (!n.agentHolding && mug.parent) {
          n.agentHolding = 'mug_1'
          mug.held = true
          mug.parent = null
        } else {
          ok = false
          error = 'cannot_pickup_mug'
        }
      }
      if (cmd === 'put_mug_drawer') {
        if (n.agentHolding === 'mug_1' && n.receptacles.drawer_1.open) {
          n.agentHolding = null
          mug.held = false
          mug.parent = 'drawer_1'
        } else {
          ok = false
          error = 'cannot_put_mug_drawer'
        }
      }

      const misplaced = Object.entries(n.goals)
        .filter(([obj, target]) => n.objects[obj].parent !== target)
        .map(([obj]) => obj)
      const recMismatch = Object.entries(n.receptacles)
        .filter(([_, r]) => r.open !== r.goalOpen)
        .map(([name]) => name)
      const totalChecks = Object.keys(n.goals).length + Object.keys(n.receptacles).length
      const mismatchCount = misplaced.length + recMismatch.length
      const fraction = Math.max(0, Math.min(1, 1 - mismatchCount / totalChecks))

      n.logs.push(
        JSON.stringify({
          time: n.t,
          cmd,
          ok,
          error,
          misplaced_objects: misplaced,
          receptacle_mismatches: recMismatch,
          fraction_complete: Number(fraction.toFixed(3)),
          done: mismatchCount === 0,
        })
      )
      return n
    })
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] overflow-x-visible px-4 py-7 md:px-6">
      <section className="mb-5 rounded-2xl border-2 border-sky-300 bg-sky-50 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-800">Click to switch view</p>
        <div className="grid gap-2 md:grid-cols-2">
          <button
            type="button"
            onClick={() => { setTopTab('benchmark'); setActiveCaseId(BENCHMARK_CASE_ID); window.location.hash = 'benchmark' }}
            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              topTab === 'benchmark'
                ? 'border-sky-600 bg-sky-600 text-white shadow'
                : 'border-sky-300 bg-white text-sky-800 hover:border-sky-500'
            }`}
          >
            Benchmark Deep Dive
          </button>
          <button
            type="button"
            onClick={() => { setTopTab('workflow'); setActiveCaseId('wetlab'); window.location.hash = 'usage' }}
            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              topTab === 'workflow'
                ? 'border-indigo-600 bg-indigo-600 text-white shadow'
                : 'border-indigo-300 bg-white text-indigo-800 hover:border-indigo-500'
            }`}
          >
            Real-World Usage
          </button>
        </div>
        {topTab === 'benchmark' && (
          <p className="mt-2 text-[11px] text-sky-800">
            Standard benchmark pipeline: specification Spec=(Spec<sub>ope</sub>, Spec<sub>beh</sub>) -&gt; generated executable simulator M -&gt; checker computes Score<sub>ope</sub> and Score<sub>beh</sub>.
          </p>
        )}
        {topTab === 'workflow' && (
          <p className="mt-2 text-[11px] text-indigo-800">
            In real planning tasks, LLMs must reason over complex, uncertain scenarios. Direct reasoning often fails; our model-assisted workflow uses executable DEVS simulations to ground decisions in evidence.
          </p>
        )}
      </section>

      {(topTab === 'benchmark' || topTab === 'workflow') && (
      <>
      {topTab === 'workflow' && (
      <section className="mb-5 grid gap-3 md:grid-cols-2">
        {tabCases.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveCaseId(c.id); window.location.hash = c.id === 'wetlab' ? 'wetlab' : 'icu' }}
            className={`rounded-2xl border p-4 text-left transition ${
              activeCaseId === c.id
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <h2 className="text-sm font-semibold text-slate-800 md:text-base">{c.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{c.tag}</p>
          </button>
        ))}
      </section>
      )}

      <div className="grid gap-4">
        {topTab === 'workflow' && <WorkflowAgentDemo activeCase={activeCase} />}

        {topTab !== 'workflow' && (
        <>
        {activeCase.id === BENCHMARK_CASE_ID && (
          <Panel icon={<FileJson2 className="size-4" />} title="Input Specification Given to Generator (three required parts)">
            <div className="mb-2 rounded-lg border border-sky-200 bg-sky-50 p-2">
              <p className="text-xs font-semibold text-sky-900">Exact LLM input for this benchmark scene.</p>
              <p className="mt-1 text-[11px] text-slate-700">The three blocks below are fed together as one task requirement package.</p>
            </div>
            <div className="grid gap-3 xl:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">General Implementation Requirements</p>
                <pre className="mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                  {benchmarkInputSections.general}
                </pre>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Behavioral Description (Spec<sub>beh</sub>)</p>
                <pre className="mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                  {benchmarkInputSections.scenario}
                </pre>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Operational Configuration (Spec<sub>ope</sub>)</p>
                <pre className="mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                  {benchmarkInputSections.interface}
                </pre>
              </div>
            </div>
          </Panel>
        )}

        {activeCase.id === 'wetlab' && (
          <>
            <Panel icon={<FileJson2 className="size-4" />} title="1) Task">
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                {activeCase.inputText}
              </pre>
            </Panel>

            <Panel icon={<FileJson2 className="size-4" />} title="2) Model Spec Generation">
              <p className="mb-3 text-xs text-slate-600">We prompt GPT-5.4 to generate this model spec from the task definition.</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Prompt template for model spec generation</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {WETLAB_SPEC_PROMPT_TEMPLATE}
                  </pre>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Generated model spec (scene_2_spec.yaml)</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {WETLAB_SPEC_EXAMPLE}
                  </pre>
                </div>
              </div>
            </Panel>
          </>
        )}

        {activeCase.id === 'icu' && (
          <>
            <Panel icon={<FileJson2 className="size-4" />} title="1) Task">
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                {activeCase.inputText}
              </pre>
            </Panel>

            <Panel icon={<FileJson2 className="size-4" />} title="2) Model Spec Generation">
              <p className="mb-3 text-xs text-slate-600">We prompt GPT-5.4 to generate this model spec from the task definition.</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Prompt template for model spec generation</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {WETLAB_SPEC_PROMPT_TEMPLATE}
                  </pre>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Generated model spec (scene_1_spec.yaml)</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {ICU_SPEC_EXAMPLE}
                  </pre>
                </div>
              </div>
            </Panel>
          </>
        )}

        {activeCase.id !== 'wetlab' && activeCase.id !== 'icu' && activeCase.id !== BENCHMARK_CASE_ID && (
          <Panel icon={<FileJson2 className="size-4" />} title="1) Full Original System Input">
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
              {activeCase.inputText}
            </pre>
          </Panel>
        )}

        {activeCase.id === BENCHMARK_CASE_ID && (
          <div className="grid w-full items-start gap-4 lg:grid-cols-[170px_minmax(0,1fr)]">
            <div className="self-start lg:sticky lg:top-4">
              <div className="flex w-full flex-col items-center">
                <p className="text-center text-[11px] font-semibold text-sky-700">From panel 1 input</p>
                <div className="my-1 h-12 border-l-2 border-sky-400" />
                <p className="-mt-1 mb-1 text-sky-500">↓</p>

                <div className="w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-3 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-cyan-800">
                    <Bot className="size-4" />
                    <p className="text-xs font-semibold uppercase tracking-wide">DEVS-GEN workflow</p>
                  </div>
                  <p className="mb-2 text-[11px] text-slate-700">
                    This is the DEVS-GEN path used in this demo. In the benchmark pipeline, this generation stage can be replaced by other frameworks.
                  </p>
                  <div className="space-y-2 text-[11px] text-slate-700">
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <p className="font-semibold text-indigo-700">Stage 1: Structural Planning (from Natural Language to PlanTree)</p>
                      <p>Generate model decomposition and interface skeleton.</p>
                    </div>
                    <div className="flex justify-center text-slate-500">↓</div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <p className="font-semibold text-violet-700">Stage 2: Behavioral Synthesizing (from PlanTree to DEVS Model)</p>
                      <p>Generate executable wiring and DEVS behavior methods.</p>
                    </div>
                  </div>
                </div>

                <div className="my-1 h-14 border-l-2 border-emerald-400" />
                <p className="-mt-1 mb-1 text-emerald-500">↓</p>
                <p className="text-center text-[11px] font-semibold text-emerald-700">Evaluation of the Generated DEVS Model</p>
              </div>
            </div>

            <div className="grid min-w-0 gap-4">
              <Panel icon={<GitBranch className="size-4" />} title="Stage 1: Structural Planning (from Natural Language to PlanTree)">
                <p className="mb-2 text-xs text-slate-600">
                  This panel shows the structural generation result for this scene: model decomposition and interface skeleton.
                </p>
                <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <TreeNode
                      node={activeCase.planTree}
                      depth={0}
                      openTree={openTree}
                      setOpenTree={setOpenTree}
                      selectedTreeNodeId={selectedTreeNodeId}
                      setSelectedTreeNodeId={setSelectedTreeNodeId}
                    />
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h3 className="mb-2 text-sm font-semibold text-slate-800">{selectedTreeNode.name}</h3>
                    <p className="mb-3 text-xs text-slate-500">{selectedTreeNode.type} · {selectedTreeNode.summary}</p>
                    <div className="mb-3 rounded-xl border border-cyan-200 bg-cyan-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">ModelPlan Interface</p>
                      <p className="mt-1 text-[11px] text-slate-600">
                        Includes <code>model_init_args</code>, <code>input_ports</code>, <code>output_ports</code>, and output trace schema obligations.
                      </p>
                      <div className="mt-2">
                        <KV title="init args" items={selectedTreeNode.initArgsTyped || withUnknownType(selectedTreeNode.initArgs)} />
                        <KV title="input ports" items={selectedTreeNode.portsTyped?.input || withUnknownType(selectedTreeNode.ports?.input || [])} />
                        <KV title="output ports" items={selectedTreeNode.portsTyped?.output || withUnknownType(selectedTreeNode.ports?.output || [])} />
                      </div>
                      <details className="rounded-lg border border-slate-200 bg-white p-2">
                        <summary className="cursor-pointer text-xs text-sky-700">ModelPlan typed schema details (args + ports)</summary>
                        <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                          {selectedTreeNode.details?.schemas || 'No embedded schema detail for this node.'}
                        </pre>
                      </details>
                      <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                        <summary className="cursor-pointer text-xs text-sky-700">ModelPlan logging requirements</summary>
                        <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                          {selectedTreeNode.details?.logging || 'No embedded full logging text for this node.'}
                        </pre>
                      </details>
                    </div>

                    <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">ModelPlan</p>
                      <details className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
                        <summary className="cursor-pointer text-xs text-sky-700">Function semantics</summary>
                        <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                          {selectedTreeNode.details?.function || 'No embedded full function text for this node.'}
                        </pre>
                      </details>
                    </div>

                    <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                      <summary className="cursor-pointer text-xs text-sky-700">Raw node object (full available detail)</summary>
                      <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                        {JSON.stringify(selectedTreeNode, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>
              </Panel>

              <Panel icon={<Network className="size-4" />} title="Stage 2: Behavioral Synthesizing (from PlanTree to DEVS Model)">
                <p className="mb-2 text-xs text-slate-600">
                  This panel shows the behavioral generation result: executable wiring and DEVS transition/output methods used in evaluation.
                </p>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <CodeGraph
                      graphKey={activeCase.id}
                      graph={activeCase.codeGraph}
                      selectedCodeNodeId={selectedCodeNodeId}
                      setSelectedCodeNodeId={setSelectedCodeNodeId}
                    />
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h3 className="mb-1 text-sm font-semibold text-slate-800">{selectedCodeNode.label}</h3>
                    <p className="mb-2 text-xs text-slate-500">file: {selectedCodeNode.file}</p>
                    <KV title="input ports" items={selectedCodeNode.portsTyped?.in || withUnknownType(selectedCodeNode.ports.in)} compact />
                    <KV title="output ports" items={selectedCodeNode.portsTyped?.out || withUnknownType(selectedCodeNode.ports.out)} compact />
                    <h4 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Behavioral semantics (DEVS transition/output functions)
                    </h4>
                    <div className="space-y-2">
                      {getMethodViews(selectedCodeNode).map((m) => (
                        <details key={m.name} className="rounded-lg border border-slate-200 bg-white p-2">
                          <summary className="cursor-pointer text-xs text-sky-700">{m.name} · {m.paperName}</summary>
                          <p className="mb-1 mt-2 text-[11px] text-slate-600">{m.intro}</p>
                          <pre className="mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700">{String(m.code)}</pre>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        )}

        {activeCase.id !== BENCHMARK_CASE_ID && (
        <>
        <Panel
          icon={<GitBranch className="size-4" />}
          title={
            activeCase.id === BENCHMARK_CASE_ID
              ? '2) Generation Output A: Stage 1 Structural Planning (PlanTree / Algorithm 2)'
              : activeCase.id === 'wetlab' || activeCase.id === 'icu'
                ? '3) Modeling Plan Tree (expand + inspect)'
                : '2) Modeling Plan Tree (expand + inspect)'
          }
        >
          {activeCase.id === BENCHMARK_CASE_ID && (
            <div className="mb-2 rounded-xl border border-amber-300 bg-amber-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Generated by DEVS-GEN (not benchmark asset)</p>
              <p className="mt-1 text-[12px] text-slate-700">
                We feed the benchmark scenario specification (panel 1) into our DEVS-GEN framework. This panel shows Stage 1 structural planning output: model decomposition and interfaces.
              </p>
            </div>
          )}
          <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <TreeNode
                node={activeCase.planTree}
                depth={0}
                openTree={openTree}
                setOpenTree={setOpenTree}
                selectedTreeNodeId={selectedTreeNodeId}
                setSelectedTreeNodeId={setSelectedTreeNodeId}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-800">{selectedTreeNode.name}</h3>
              <p className="mb-3 text-xs text-slate-500">{selectedTreeNode.type} · {selectedTreeNode.summary}</p>
              <div className="mb-3 rounded-xl border border-cyan-200 bg-cyan-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  {activeCase.id === BENCHMARK_CASE_ID ? 'ModelPlan Interface' : 'Interface overview'}
                </p>
                {activeCase.id === BENCHMARK_CASE_ID && (
                  <p className="mt-1 text-[11px] text-slate-600">
                    Includes <code>model_init_args</code>, <code>input_ports</code>, <code>output_ports</code>, and output trace schema obligations.
                  </p>
                )}
                <div className="mt-2">
                  <KV title="init args" items={selectedTreeNode.initArgsTyped || withUnknownType(selectedTreeNode.initArgs)} />
                  <KV title="input ports" items={selectedTreeNode.portsTyped?.input || withUnknownType(selectedTreeNode.ports?.input || [])} />
                  <KV title="output ports" items={selectedTreeNode.portsTyped?.output || withUnknownType(selectedTreeNode.ports?.output || [])} />
                </div>
                <details className="rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    {activeCase.id === BENCHMARK_CASE_ID ? 'ModelPlan typed schema details (args + ports)' : 'Typed schemas (args + ports)'}
                  </summary>
                  <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.schemas || 'No embedded schema detail for this node.'}
                  </pre>
                </details>
                <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    {activeCase.id === BENCHMARK_CASE_ID ? 'ModelPlan logging requirements' : 'Logging detail (expanded)'}
                  </summary>
                  <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.logging || 'No embedded full logging text for this node.'}
                  </pre>
                </details>
              </div>

              <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">ModelPlan</p>
                <details className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    {activeCase.id === BENCHMARK_CASE_ID ? 'Function semantics' : 'Function description (expanded)'}
                  </summary>
                  <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.function || 'No embedded full function text for this node.'}
                  </pre>
                </details>
              </div>

              <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                <summary className="cursor-pointer text-xs text-sky-700">Raw node object (full available detail)</summary>
                <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                  {JSON.stringify(selectedTreeNode, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </Panel>

        <Panel
          icon={<Network className="size-4" />}
          title={
            activeCase.id === BENCHMARK_CASE_ID
              ? '3) Generation Output B: Stage 2 Behavioral Synthesizing (Code Topology + DEVS Methods)'
              : activeCase.id === 'wetlab' || activeCase.id === 'icu'
                ? '4) Code Topology + IO Ports + Method Details'
                : '3) Code Topology + IO Ports + Method Details'
          }
        >
          {activeCase.id === BENCHMARK_CASE_ID && (
            <div className="mb-2 rounded-xl border border-amber-300 bg-amber-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Generated by DEVS-GEN (not benchmark asset)</p>
              <p className="mt-1 text-[12px] text-slate-700">
                This is Stage 2 (Behavioral Synthesizing) from the same scenario specification. DEVS-GEN produces executable wiring and transition logic, which are exactly what panel 4 evaluates.
              </p>
            </div>
          )}
          <div className="grid gap-4 xl:grid-cols-[1.18fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <CodeGraph
                graphKey={activeCase.id}
                graph={activeCase.codeGraph}
                selectedCodeNodeId={selectedCodeNodeId}
                setSelectedCodeNodeId={setSelectedCodeNodeId}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="mb-1 text-sm font-semibold text-slate-800">{selectedCodeNode.label}</h3>
              <p className="mb-2 text-xs text-slate-500">file: {selectedCodeNode.file}</p>
              <KV title="input ports" items={selectedCodeNode.portsTyped?.in || withUnknownType(selectedCodeNode.ports.in)} compact />
              <KV title="output ports" items={selectedCodeNode.portsTyped?.out || withUnknownType(selectedCodeNode.ports.out)} compact />
              <h4 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {activeCase.id === BENCHMARK_CASE_ID ? 'Behavioral semantics (DEVS transition/output functions)' : 'DEVS methods (paper-aligned naming)'}
              </h4>
              <div className="space-y-2">
                {getMethodViews(selectedCodeNode).map((m) => (
                  <details key={m.name} className="rounded-lg border border-slate-200 bg-white p-2">
                    <summary className="cursor-pointer text-xs text-sky-700">{m.name} · {m.paperName}</summary>
                    <p className="mb-1 mt-2 text-[11px] text-slate-600">{m.intro}</p>
                    <pre className="mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700">{String(m.code)}</pre>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Panel>
        </>
        )}

        {activeCase.id === BENCHMARK_CASE_ID && (
          <Panel icon={<CheckCircle2 className="size-4" />} title="Evaluation of the Generated DEVS Model">
            <p className="mb-2 text-xs text-slate-600">
              This stage is the actual benchmark evaluation: run test suite cases, read traces from the generated model, apply checker rules, then aggregate final metrics.
            </p>

            {benchmarkEvalAsset && (
              <div className="mb-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <p className="text-xs font-semibold text-slate-700">Evaluation assets</p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Test suite D and per-case input d_i=(I,J) are loaded from benchmark configuration.
                </p>
                {benchmarkEvalAsset.sampleSelectionNote && (
                  <p className="mt-1 text-[11px] text-slate-600">{benchmarkEvalAsset.sampleSelectionNote}</p>
                )}
                <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{benchmarkEvalAsset.sampleConfig}</pre>
              </div>
            )}

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">Evaluation process on the generated model (Step 1-3)</p>
            <div className="space-y-2">
              {benchmarkEvalProcess.map((s, idx) => (
                  <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-2">
                    <p className="text-xs font-semibold text-sky-700">Step {idx + 1} · {s.title}</p>

                    {s.id === 's2' && (
                      <div className="mt-2">
                        <p className="text-[11px] font-semibold text-slate-700">Selected generated log trace excerpt</p>
                        {s.sampleLogNote && (
                          <p className="mt-1 text-[11px] text-slate-600">{s.sampleLogNote}</p>
                        )}
                        <pre className="mt-1 max-h-52 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">{s.sampleLogs}</pre>
                      </div>
                    )}

                    {s.id === 's3' && (
                      <div className="mt-2">
                        <p className="mt-1 text-[11px] text-slate-600">
                          Rules run over relevant events and event relations in T_i; checker accumulates evidence by repeated add_case(...) calls.
                        </p>
                        <div className="mt-2 space-y-2">
                          {activeCase.evalRuleGroups.map((grp) => (
                            <details key={grp.group} className="rounded-lg border border-slate-200 bg-slate-50 p-2" open>
                              <summary className="cursor-pointer text-xs font-semibold text-indigo-700">{grp.group}</summary>
                              <div className="mt-2 space-y-2">
                                {grp.rules.map((r) => (
                                  <details key={r.name} className="rounded-md border border-slate-200 bg-white p-2">
                                    <summary className="cursor-pointer text-[11px] font-semibold text-sky-700">{r.name}</summary>
                                    <p className="mt-1 text-[11px] text-slate-700">{r.what}</p>
                                    <p className="mt-1 text-[11px] text-slate-600">Granularity: {r.granularity}</p>
                                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Checker core flow</p>
                                    <pre className="mt-1 max-h-36 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{r.checkerCode}</pre>
                                  </details>
                                ))}
                              </div>
                            </details>
                          ))}
                        </div>
                      </div>
                    )}

                    {s.id === 's4' && s.formula && (
                      <div className="mt-2">
                        <p className="text-[11px] font-semibold text-slate-700">Metric equations</p>
                        <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">{s.formula}</pre>
                        {s.workedExample && (
                          <>
                            <p className="mt-2 text-[11px] font-semibold text-slate-700">Worked example</p>
                            <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">{s.workedExample}</pre>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>

          </Panel>
        )}

        {activeCase.id === 'wetlab' && (
          <Panel icon={<CheckCircle2 className="size-4" />} title="5) Direct vs Model-assisted Reasoning Comparison">
            <div className="grid gap-3 xl:grid-cols-2">
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">Direct run(wrong)</p>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_OUTPUT_RAW}</pre>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Model-assisted workflow run(right)</p>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_OUTPUT_RAW}</pre>
                </div>
              </div>
            </div>

          </Panel>
        )}

        {activeCase.id === 'icu' && (
          <Panel icon={<CheckCircle2 className="size-4" />} title="5) Direct vs Model-assisted Reasoning Comparison">
            <div className="grid gap-3 xl:grid-cols-2">
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">Direct run(wrong)</p>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_DIRECT_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_DIRECT_OUTPUT_RAW}</pre>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Model-assisted workflow run(right)</p>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_ASSIST_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_ASSIST_OUTPUT_RAW}</pre>
                </div>
              </div>
            </div>

          </Panel>
        )}

        {activeCase.interactive?.type === 'ai2thor' && (
          <Panel icon={<Route className="size-4" />} title="5) Interactive Demo (complex world model)">
            <div className="mb-3 flex flex-wrap gap-2">
              {[
                ['compare_to_goal', 'compare_to_goal'],
                ['open_drawer', 'open_drawer'],
                ['pickup_mug', 'pickup_mug'],
                ['put_mug_drawer', 'put_mug_drawer'],
                ['close_fridge', 'close_fridge'],
                ['reset', 'reset'],
              ].map(([label, cmd]) => (
                <button
                  key={cmd}
                  onClick={() => runAi2Command(cmd)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 hover:border-sky-400"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mb-3 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              {[
                `time=${ai2State.t}`,
                `holding=${ai2State.agentHolding ?? 'none'}`,
                `mug_1.parent=${ai2State.objects.mug_1.parent ?? 'held'}`,
                `fridge_open=${ai2State.receptacles.fridge_1.open}`,
                `drawer_open=${ai2State.receptacles.drawer_1.open}`,
                `apple_1.parent=${ai2State.objects.apple_1.parent}`,
              ].map((x) => (
                <div key={x} className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-700">
                  {x}
                </div>
              ))}
            </div>
            <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
              {ai2State.logs.join('\n') || 'No events yet'}
            </pre>
          </Panel>
        )}
        </>
        )}
      </div>
      </>
      )}

    </div>
  )
}

function WorkflowAgentDemo({ activeCase }) {
  const cfg = WORKFLOW_DEMO_DATA[activeCase.id]
  if (!cfg) return null

  const specText = activeCase.id === 'wetlab' ? WETLAB_SPEC_EXAMPLE : ICU_SPEC_EXAMPLE
  const directOutput = activeCase.id === 'wetlab' ? WETLAB_DIRECT_OUTPUT_RAW : ICU_DIRECT_OUTPUT_RAW
  const assistOutput = activeCase.id === 'wetlab' ? WETLAB_ASSIST_OUTPUT_RAW : ICU_ASSIST_OUTPUT_RAW
  const caseLabel = activeCase.id === 'wetlab' ? 'Wet-Lab' : 'ICU'
  const directUserPrompt = useMemo(
    () => `${activeCase.inputText}\n\n${DIRECT_USER_PROMPT_SUFFIX}`,
    [activeCase]
  )
  const [wfOpenTree, setWfOpenTree] = useState(() => ({ [activeCase.planTree.id]: true }))
  const [wfSelectedTreeNodeId, setWfSelectedTreeNodeId] = useState(activeCase.planTree.id)
  const [wfSelectedCodeNodeId, setWfSelectedCodeNodeId] = useState(activeCase.codeGraph.nodes[0]?.id || '')

  useEffect(() => {
    setWfOpenTree({ [activeCase.planTree.id]: true })
    setWfSelectedTreeNodeId(activeCase.planTree.id)
    setWfSelectedCodeNodeId(activeCase.codeGraph.nodes[0]?.id || '')
  }, [activeCase])

  const wfSelectedTreeNode = useMemo(
    () => findTreeNode(activeCase.planTree, wfSelectedTreeNodeId) ?? activeCase.planTree,
    [activeCase, wfSelectedTreeNodeId]
  )

  const wfSelectedCodeNode = useMemo(
    () => findGraphNode(activeCase.codeGraph.nodes, wfSelectedCodeNodeId) ?? activeCase.codeGraph.nodes[0],
    [activeCase, wfSelectedCodeNodeId]
  )

  const specPreview = useMemo(() => {
    const lines = String(specText).split('\n')
    const keep = 120
    return lines.slice(0, keep).join('\n') + (lines.length > keep ? '\n... (trimmed for demo view)' : '')
  }, [specText])

  const constructToolCall = useMemo(
    () => `{"type":"tool_call","name":"construct_devs_model","arguments":{"spec_yaml":"<see spec block below>"}}`,
    []
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[150px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-4 rounded-xl border border-slate-200 bg-white p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">On this page</p>
          <div className="space-y-1 text-xs">
            <a href="#wf-agent" className="block rounded px-2 py-1 text-emerald-700 hover:bg-slate-100">Agent workflow (correct)</a>
            <a href="#wf-direct" className="block rounded px-2 py-1 text-rose-700 hover:bg-slate-100">Direct run (wrong)</a>
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">

      <div id="wf-agent" className="scroll-mt-24">
      <Panel icon={<Bot className="size-4" />} title={`Agent Workflow Demo (${caseLabel})`}>
        <div className="space-y-3">
          <ChatTurn role="system" title="system">
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{AGENT_WORKFLOW_SYSTEM_PROMPT}</pre>
          </ChatTurn>

          <ChatTurn role="user" title="user">
            <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.firstUserPrompt}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool_calling">
            <pre className="max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{constructToolCall}</pre>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{specPreview}</pre>

            <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3">
              <p className="mb-2 text-[11px] text-slate-700">
                Internal DEVS-GEN construction flow inside this tool call. The two blocks below show what was built.
              </p>
              <div className="grid w-full gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">Stage 1: Structural Planning (from Natural Language to PlanTree)</p>
                  <div className="grid gap-3 lg:grid-cols-[0.95fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <TreeNode
                        node={activeCase.planTree}
                        depth={0}
                        openTree={wfOpenTree}
                        setOpenTree={setWfOpenTree}
                        selectedTreeNodeId={wfSelectedTreeNodeId}
                        setSelectedTreeNodeId={setWfSelectedTreeNodeId}
                      />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <h3 className="mb-1 text-sm font-semibold text-slate-800">{wfSelectedTreeNode.name}</h3>
                      <p className="mb-2 text-xs text-slate-500">{wfSelectedTreeNode.type} · {wfSelectedTreeNode.summary}</p>
                      <KV title="init args" items={wfSelectedTreeNode.initArgsTyped || withUnknownType(wfSelectedTreeNode.initArgs)} />
                      <KV title="input ports" items={wfSelectedTreeNode.portsTyped?.input || withUnknownType(wfSelectedTreeNode.ports?.input || [])} />
                      <KV title="output ports" items={wfSelectedTreeNode.portsTyped?.output || withUnknownType(wfSelectedTreeNode.ports?.output || [])} />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">Stage 2: Behavioral Synthesizing (from PlanTree to DEVS Model)</p>
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <CodeGraph
                        graphKey={`workflow-${activeCase.id}`}
                        graph={activeCase.codeGraph}
                        selectedCodeNodeId={wfSelectedCodeNodeId}
                        setSelectedCodeNodeId={setWfSelectedCodeNodeId}
                        compact
                      />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <h3 className="mb-1 text-sm font-semibold text-slate-800">{wfSelectedCodeNode.label}</h3>
                      <p className="mb-2 text-xs text-slate-500">file: {wfSelectedCodeNode.file}</p>
                      <KV title="input ports" items={wfSelectedCodeNode.portsTyped?.in || withUnknownType(wfSelectedCodeNode.ports.in)} compact />
                      <KV title="output ports" items={wfSelectedCodeNode.portsTyped?.out || withUnknownType(wfSelectedCodeNode.ports.out)} compact />
                      <div className="mt-2 space-y-2">
                        {getMethodViews(wfSelectedCodeNode).map((m) => (
                          <details key={m.name} className="rounded-lg border border-slate-200 bg-white p-2">
                            <summary className="cursor-pointer text-xs text-sky-700">{m.name} · {m.paperName}</summary>
                            <pre className="mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700">{String(m.code)}</pre>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
              <pre className="max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.constructResult}</pre>
            </div>
          </ChatTurn>

          <ChatTurn role="reasoning" title="reasoning">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.reasoningBeforeRuns}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool_calling">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.runAInput}</pre>
            <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{cfg.runAResult}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool_calling">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.runBInput}</pre>
            <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{cfg.runBResult}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool_calling">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.runCInput}</pre>
            <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{cfg.runCResult}</pre>
          </ChatTurn>

          <ChatTurn role="reasoning" title="reasoning">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.reasoningAfterRuns}</pre>
          </ChatTurn>

          <ChatTurn role="reply" title="reply">
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{assistOutput}</pre>
          </ChatTurn>
        </div>
      </Panel>
      </div>

      <div id="wf-direct" className="scroll-mt-24">
      <Panel icon={<CircleX className="size-4" />} title="Direct run(wrong)">
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
            <span className="font-mono text-slate-700">GPT-5.4</span>
            <span className="ml-2 text-slate-600">Reasoning trace omitted; final result only.</span>
          </div>

          <ChatTurn role="system" title="system">
            <pre className="max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{DIRECT_SYSTEM_PROMPT}</pre>
          </ChatTurn>

          <ChatTurn role="user" title="user">
            <pre className="max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{directUserPrompt}</pre>
          </ChatTurn>

          <ChatTurn role="reply" title="reply">
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{directOutput}</pre>
          </ChatTurn>
        </div>
      </Panel>
      </div>
      </div>
      </div>
    </div>
  )
}

function ChatTurn({ role, title, children }) {
  const style = {
    system: 'border-cyan-200 bg-cyan-50',
    user: 'border-slate-300 bg-slate-50',
    tool_calling: 'border-emerald-200 bg-emerald-50',
    reasoning: 'border-indigo-200 bg-indigo-50',
    reply: 'border-amber-300 bg-amber-50',
  }

  if (role === 'system') {
    return (
      <div className={`rounded-xl border p-3 ${style[role]}`}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">{title}</p>
        {children}
      </div>
    )
  }

  const align = role === 'user' ? 'justify-end' : 'justify-start'
  const widthClass = role === 'user' ? 'max-w-[84%]' : 'max-w-[98%]'

  return (
    <div className={`flex ${align}`}>
      <div className={`w-full ${widthClass} rounded-xl border p-3 ${style[role] || 'border-slate-200 bg-white'}`}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">{title}</p>
        {children}
      </div>
    </div>
  )
}

function Panel({ icon, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-0 w-full rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg"
    >
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 md:text-base">
        <span className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-sky-700">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

function TreeNode({ node, depth, openTree, setOpenTree, selectedTreeNodeId, setSelectedTreeNodeId }) {
  const isOpen = openTree[node.id] ?? false
  const hasChildren = node.children.length > 0
  const active = selectedTreeNodeId === node.id
  return (
    <div className="mb-2">
      <div
        className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-xs ${
          active
            ? node.type === 'coupled'
              ? 'border-indigo-400 bg-indigo-50 text-indigo-800'
              : 'border-sky-400 bg-sky-50 text-sky-700'
            : node.type === 'coupled'
              ? 'border-indigo-200 bg-indigo-50/40 text-slate-700'
              : 'border-slate-200 bg-white text-slate-700'
        }`}
        style={{ marginLeft: `${depth * 18}px` }}
      >
        {hasChildren ? (
          <button
            className="rounded p-0.5 hover:bg-slate-700"
            onClick={() => setOpenTree((s) => ({ ...s, [node.id]: !isOpen }))}
          >
            <ChevronDown className={`size-3 transition ${isOpen ? '' : '-rotate-90'}`} />
          </button>
        ) : (
          <span className="inline-block size-3" />
        )}
        <button className="text-left" onClick={() => setSelectedTreeNodeId(node.id)}>
          <span className="font-semibold">{depth > 0 ? '↳ ' : ''}{node.name}</span>
          <span className="ml-2 rounded-full border border-slate-300 px-2 py-0.5 text-[10px] uppercase text-slate-500">{node.type}</span>
          {hasChildren && <span className="ml-2 text-[10px] text-slate-500">contains {node.children.length} submodels</span>}
        </button>
      </div>
      {hasChildren && isOpen && (
        <div className="mt-1 border-l border-slate-300 pl-1">
          {node.children.map((c) => (
            <TreeNode
              key={c.id}
              node={c}
              depth={depth + 1}
              openTree={openTree}
              setOpenTree={setOpenTree}
              selectedTreeNodeId={selectedTreeNodeId}
              setSelectedTreeNodeId={setSelectedTreeNodeId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function KV({ title, items, compact = false }) {
  return (
    <div className="mb-3">
      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{title}</h4>
      <div className={`flex flex-wrap gap-1.5 ${compact ? 'text-[11px]' : 'text-xs'}`}>
        {items.map((it) => (
          <span key={typeof it === 'string' ? it : `${it.name}:${it.type || ''}`} className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-slate-700">
            {typeof it === 'string' ? it : `${it.name}: ${it.type || '?'}`}
          </span>
        ))}
      </div>
    </div>
  )
}

function CodeGraph({ graphKey, graph, selectedCodeNodeId, setSelectedCodeNodeId, compact = false }) {
  const ATOMIC_HALF_W = compact ? 70 : 78
  const ATOMIC_HALF_H = compact ? 22 : 23
  const COUPLED_HALF_W = compact ? 98 : 108
  const COUPLED_HALF_H = compact ? 26 : 27
  const GROUP_PAD_X = compact ? 14 : 18
  const GROUP_PAD_Y = compact ? 12 : 16
  const GROUP_LABEL_H = compact ? 14 : 16
  const SVG_W = compact ? 1120 : 1360
  const SVG_H = compact ? 470 : 560
  const EDGE_START_GAP = 1
  const EDGE_END_GAP = 11

  const getNodeHalfSize = (node) => {
    if (node?.modelType === 'coupled') return { w: COUPLED_HALF_W, h: COUPLED_HALF_H }
    return { w: ATOMIC_HALF_W, h: ATOMIC_HALF_H }
  }

  const splitNodeLabel = (label) => {
    const text = String(label || '')
    const withParen = text.split(' (')
    if (withParen.length > 1) {
      const head = withParen[0]
      const tail = `(${withParen.slice(1).join(' (')}`
      return [head, tail]
    }
    if (text.length <= 24) return [text]
    const mid = Math.floor(text.length / 2)
    let cut = text.lastIndexOf('_', mid)
    if (cut < 6) cut = text.indexOf('_', mid)
    if (cut > 5 && cut < text.length - 5) {
      return [text.slice(0, cut), text.slice(cut + 1)]
    }
    return [text]
  }

  const rayRectDistance = (ux, uy, halfW, halfH) => {
    const tx = Math.abs(ux) < 1e-6 ? Number.POSITIVE_INFINITY : halfW / Math.abs(ux)
    const ty = Math.abs(uy) < 1e-6 ? Number.POSITIVE_INFINITY : halfH / Math.abs(uy)
    return Math.min(tx, ty)
  }

  const [positions, setPositions] = useState(() => Object.fromEntries(graph.nodes.map((n) => [n.id, { x: n.x, y: n.y }])))
  const [dragEnabled, setDragEnabled] = useState(true)
  const [dragging, setDragging] = useState(null)
  const svgRef = useRef(null)

  useEffect(() => {
    setPositions(Object.fromEntries(graph.nodes.map((n) => [n.id, { x: n.x, y: n.y }])))
    setDragging(null)
    setDragEnabled(true)
  }, [graphKey, graph])

  const nodeById = Object.fromEntries(
    graph.nodes.map((n) => {
      const p = positions[n.id] || { x: n.x, y: n.y }
      return [n.id, { ...n, x: p.x, y: p.y }]
    })
  )

  const computedGroups = (graph.groups || []).map((g) => {
    if (!g.members || g.members.length === 0) return g
    const members = g.members.map((id) => nodeById[id]).filter(Boolean)
    if (members.length === 0) return g

    const minX = Math.min(...members.map((n) => n.x - getNodeHalfSize(n).w))
    const maxX = Math.max(...members.map((n) => n.x + getNodeHalfSize(n).w))
    const minY = Math.min(...members.map((n) => n.y - getNodeHalfSize(n).h))
    const maxY = Math.max(...members.map((n) => n.y + getNodeHalfSize(n).h))

    const x = Math.max(8, minX - GROUP_PAD_X)
    const y = Math.max(8, minY - GROUP_PAD_Y - GROUP_LABEL_H)
    const w = Math.min(SVG_W - 16 - x, maxX - minX + GROUP_PAD_X * 2)
    const h = Math.min(SVG_H - 16 - y, maxY - minY + GROUP_PAD_Y * 2 + GROUP_LABEL_H)
    return { ...g, x, y, w, h }
  })

  const getSvgPoint = (evt) => {
    const svg = svgRef.current
    if (!svg) return null
    const pt = svg.createSVGPoint()
    pt.x = evt.clientX
    pt.y = evt.clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    return pt.matrixTransform(ctm.inverse())
  }

  const onNodeDown = (evt, node) => {
    if (!dragEnabled) return
    evt.preventDefault()
    const p = getSvgPoint(evt)
    if (!p) return
    setDragging({ id: node.id, dx: node.x - p.x, dy: node.y - p.y })
  }

  const onMove = (evt) => {
    if (!dragging) return
    const p = getSvgPoint(evt)
    if (!p) return
    const node = nodeById[dragging.id]
    const half = getNodeHalfSize(node)
    const nx = Math.max(half.w + 6, Math.min(SVG_W - half.w - 6, p.x + dragging.dx))
    const ny = Math.max(half.h + 6, Math.min(SVG_H - half.h - 6, p.y + dragging.dy))
    setPositions((s) => ({ ...s, [dragging.id]: { x: nx, y: ny } }))
  }

  const onUp = () => setDragging(null)
  const markerId = `arrow-${graphKey}`
  const pairEdgeOffsets = useMemo(() => {
    const pairMap = new Map()
    graph.edges.forEach(([src, dst], idx) => {
      const key = src < dst ? `${src}__${dst}` : `${dst}__${src}`
      const arr = pairMap.get(key) || []
      arr.push(idx)
      pairMap.set(key, arr)
    })
    const offsets = {}
    for (const indices of pairMap.values()) {
      const n = indices.length
      indices.forEach((edgeIdx, order) => {
        const centered = order - (n - 1) / 2
        offsets[edgeIdx] = centered * (compact ? 18 : 24)
      })
    }
    return offsets
  }, [graph.edges, compact])

  const getEdgeStyle = (label) => {
    const t = String(label || '')
    if (t.startsWith('EIC')) {
      return { stroke: '#0369a1', text: '#075985', dash: undefined, marker: true }
    }
    if (t.startsWith('EOC')) {
      return { stroke: '#047857', text: '#065f46', dash: undefined, marker: true }
    }
    if (t.startsWith('IC')) {
      return { stroke: '#475569', text: '#475569', dash: undefined, marker: true }
    }
    if (t === 'contains') {
      return { stroke: '#94a3b8', text: '#64748b', dash: '4 3', marker: false }
    }
    return { stroke: '#64748b', text: '#64748b', dash: undefined, marker: true }
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[11px] text-slate-500">
        <span className="text-slate-500">Static layout optimized for readability; optional drag mode for manual tuning.</span>
        <button
          onClick={() => setDragEnabled((v) => !v)}
          className={`rounded-md border px-2 py-1 ${dragEnabled ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-slate-300 bg-white text-slate-700'}`}
        >
          {dragEnabled ? 'Drag: ON' : 'Drag: OFF'}
        </button>
      </div>
      <div className={`mb-2 flex flex-wrap items-center gap-3 ${compact ? 'text-[9px]' : 'text-[10px]'} text-slate-500`}>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 bg-[#0369a1]" />EIC: External Input Coupling</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 bg-[#475569]" />IC: Internal Coupling</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 bg-[#047857]" />EOC: External Output Coupling</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 border-t border-dashed border-[#94a3b8]" />contains</span>
      </div>
      <div className="overflow-x-auto pb-1">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className={`${compact ? 'h-[390px] w-full max-w-full' : 'h-[460px] w-[1360px] max-w-none'} rounded-xl border border-slate-200 bg-white`}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
      >
      <defs>
        <marker id={markerId} markerWidth="12" markerHeight="12" refX="9" refY="4" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,8 L10,4 z" fill="#475569" />
        </marker>
      </defs>
      {computedGroups.map((g, idx) => (
        <g key={`group-${idx}`}>
          <rect
            x={g.x}
            y={g.y}
            width={g.w}
            height={g.h}
            rx={12}
            fill="rgba(99, 102, 241, 0.05)"
            stroke="#818cf8"
            strokeDasharray="6 4"
            strokeWidth="1.2"
          />
          <text x={g.x + 10} y={g.y + 16} fill="#4338ca" fontSize="10">
            {g.label}
          </text>
        </g>
      ))}
      {graph.edges.map(([src, dst, label], idx) => {
        const a = nodeById[src]
        const b = nodeById[dst]
        if (!a || !b) return null
        const rawLabel = String(label || '')
        const edgeStyle = getEdgeStyle(rawLabel)
        const displayLabel = rawLabel === 'contains'
          ? 'contains'
          : rawLabel
            .replace(/^EIC[^:]*:\s*/i, '')
            .replace(/^EOC[^:]*:\s*/i, '')
            .replace(/^IC[^:]*:\s*/i, '')
        const aHalf = getNodeHalfSize(a)
        const bHalf = getNodeHalfSize(b)
        const dx = b.x - a.x
        const dy = b.y - a.y
        const len = Math.hypot(dx, dy) || 1
        const ux = dx / len
        const uy = dy / len
        const srcDist = rayRectDistance(ux, uy, aHalf.w, aHalf.h)
        const dstDist = rayRectDistance(ux, uy, bHalf.w, bHalf.h)
        const sx = a.x + ux * (srcDist + EDGE_START_GAP)
        const sy = a.y + uy * (srcDist + EDGE_START_GAP)
        const ex = b.x - ux * (dstDist + EDGE_END_GAP)
        const ey = b.y - uy * (dstDist + EDGE_END_GAP)
        const pairKey = src < dst ? `${src}__${dst}` : `${dst}__${src}`
        const [canonAId, canonBId] = pairKey.split('__')
        const canonA = nodeById[canonAId]
        const canonB = nodeById[canonBId]
        const cdx = (canonB?.x ?? b.x) - (canonA?.x ?? a.x)
        const cdy = (canonB?.y ?? b.y) - (canonA?.y ?? a.y)
        const clen = Math.hypot(cdx, cdy) || 1
        const cnx = -cdy / clen
        const cny = cdx / clen
        const bend = pairEdgeOffsets[idx] || 0
        const mx = (sx + ex) / 2
        const my = (sy + ey) / 2
        const cx = mx + cnx * bend
        const cy = my + cny * bend
        const pathD = bend === 0 ? `M ${sx} ${sy} L ${ex} ${ey}` : `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`
        const labelX = bend === 0 ? mx : mx + cnx * (bend * 0.45)
        const labelY = bend === 0 ? my - 4 : my + cny * (bend * 0.45) - 4
        return (
          <g key={`${src}-${dst}-${idx}`}>
            <path
              d={pathD}
              fill="none"
              stroke={edgeStyle.stroke}
              strokeWidth={edgeStyle.dash ? '1.2' : '1.5'}
              strokeDasharray={edgeStyle.dash}
              markerEnd={edgeStyle.marker ? `url(#${markerId})` : undefined}
            />
            <text x={labelX} y={labelY} fill={edgeStyle.text} fontSize="10" textAnchor="middle">
              {displayLabel}
            </text>
          </g>
        )
      })}
      {graph.nodes.map((n) => {
        const p = nodeById[n.id]
        const active = p.id === selectedCodeNodeId
        const coupled = p.modelType === 'coupled'
        const omitted = /omitted|\.\.\./i.test(String(p.label || ''))
        const half = getNodeHalfSize(p)
        const labelLines = splitNodeLabel(p.label)
        const fill = active ? '#e0f2fe' : omitted ? '#fff7ed' : coupled ? '#eef2ff' : '#f8fafc'
        const stroke = active ? '#0ea5e9' : omitted ? '#f59e0b' : coupled ? '#6366f1' : '#cbd5e1'
        return (
          <g
            key={p.id}
            onClick={() => setSelectedCodeNodeId(p.id)}
            onMouseDown={(evt) => onNodeDown(evt, p)}
            style={{ cursor: dragEnabled ? 'grab' : 'pointer' }}
          >
            <rect
              x={p.x - half.w}
              y={p.y - half.h}
              width={half.w * 2}
              height={half.h * 2}
              rx={10}
              fill={fill}
              stroke={stroke}
              strokeWidth={coupled ? 2 : 1.5}
              strokeDasharray={omitted ? '5 3' : undefined}
            />
            <text x={p.x} y={labelLines.length > 1 ? p.y - 8 : p.y - 2} fill="#0f172a" fontSize="11" textAnchor="middle">
              {labelLines.map((line, i) => (
                <tspan key={`${p.id}-label-${i}`} x={p.x} dy={i === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={p.x} y={labelLines.length > 1 ? p.y + 14 : p.y + 11} fill={omitted ? '#b45309' : '#0369a1'} fontSize="9" textAnchor="middle">
              in:{p.ports.in.length} out:{p.ports.out.length}
            </text>
          </g>
        )
      })}
      </svg>
      </div>
    </div>
  )
}
