class SantanderIdEnabling {
    constructor() {
      this.action = null;
      this.sendEnablingKey = false;
    }
  }

  class Live {
    constructor() {
      this.lastPasswordChangeDate = null;
      this.primarySegment = null;
      this.primarySegmentCode = null;
      this.secondarySegment = null;
      this.secondarySegmentCode = null;
      this.santanderIdEnabled = false;
      this.santanderIdEnabling = null;
      this.accounts = new ArrayList();
      this.facialBiometricsRegister = null;
      this.santanderIdSeedType = null;
    }
  }