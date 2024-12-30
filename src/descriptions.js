// Descriptions taken from this thread: https://www.reddit.com/r/outlier_ai/comments/1h5b0s7/found_out_a_way_to_check_empty_queue_reasons/
// Thank you to the community!

export const EQ_REASONS = {
    PausedProject: "Project is paused, causing no tasks to be available.",
    WorkerTagsNotMet: "Your account does not have all the required tags needed by the project or contains a tag that prohibits you from working on a project.",
    Disabled: "Removed, probably due to quality issues or project ended.",
    QualificationListFailed: "You do not meet all the project qualifications.",
    InvalidWorkerSource: "You cannot work on the project because of how you joined the platform.",
    NoTasks: "No tasks are currently available for the worker.",
    NoTasksExclusiveClaims: "No exclusive tasks are available to claim.",
    NoTasksSkippedOrAttempted: "No tasks are available, or tasks have been skipped or not attempted yet.",
    NoBatchTasks: "No batch tasks are available for the worker.",
    NoPermissions: "The worker does not have the required permissions to access tasks.",
    InvalidProject: "The project is invalid, possibly due to misconfiguration or inactivity.",
    NoBenchmarkFound: "No benchmark tasks are found for the worker.",
    PrebuildBMsExpired: "The pre-built benchmarks have expired, causing no tasks to be available.",
    TaskWallFailed: "The task wall failed to allocate tasks to the worker.",
    TaskWallWaiting: "The worker is waiting for tasks to be allocated from the task wall.",
    TaskWallThrottle: "The worker is throttled, meaning task allocation is delayed or limited.",
    Throttled: "The worker is throttled due to too many attempts or system limitations.",
    NewUserPendingAttempts: "The worker is a new user and is awaiting approval for their attempts.",
    TooManyPendingAttemptsInReviewThrottle: "The worker has too many pending attempts under review, causing throttling."
};

export const USER_LEVELS = {
    "-1": "Attempter",
    "0": "Normal Review",
    "1": "Senior Review",
    "4": "Consensus Review",
    "8": "Expedited",
    "10": "Corporate",
    "12": "Deliverable"
};
