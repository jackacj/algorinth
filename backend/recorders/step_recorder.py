from typing import Annotated

# Base Step Recorder Interface
class Step_Recorder():
    def __init__(self, enabled: bool = True):
        self.steps: list[dict] = []
        self.enabled = enabled
        self.currentIndex: int = 0

        if self.enabled:
            self.record = self._record
        else:
            self.record = self._noop

    # Get the Recorder's Steps
    def get_steps(self) -> list[dict]:
        return self.steps

    # Record Generation Actions
    def _record(self, step_type: str, **data) -> None:
        # Record Step
        self.steps.append({
            "index": self.currentIndex,
            "type": step_type,
            "data": data
        })

        # Increment Internal Index
        self.currentIndex += 1

    # No-op if Recorder is Disabled
    def _noop(self, step_type: str, **data) -> None:
        pass