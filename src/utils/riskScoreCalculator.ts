/**
 * Risk Score Calculator
 * 
 * This utility calculates a readmission risk score based on medical conditions
 * and other health factors. The score ranges from 0-100, with higher scores
 * indicating higher risk of readmission.
 */

// Risk weights for different medical conditions
const CONDITION_RISK_WEIGHTS = {
  diabetes: 79,
  hypertension: 60,
  heart_disease: 20,
  asthma: 72,
  copd: 18,
  arthritis: 81,
  cancer: 95,
  stroke: 87,
  kidney_disease: 90,
  liver_disease: 88,
  thyroid_disorder: 77,
  mental_health: 60,
  dementia: 85,
  other: 55,
};

// Risk weights for hospitalization history
const HOSPITALIZATION_RISK_WEIGHTS = {
  recentHospitalization: 25, // Base weight for recent hospitalization
  admissionCountMultiplier: 5, // Additional risk per admission
  hospitalStayDaysMultiplier: 0.5, // Additional risk per day of stay
};

// Risk weights for lifestyle factors
const LIFESTYLE_RISK_WEIGHTS = {
  smoking: {
    current: 15,
    former: 5,
    never: 0,
  },
  alcoholConsumption: {
    none: 0,
    occasional: 3,
    moderate: 7,
    frequent: 12,
  },
  physicalActivity: {
    sedentary: 10,
    light: 5,
    moderate: 2,
    active: 0,
  },
  stressLevel: {
    low: 0,
    moderate: 5,
    high: 10,
    severe: 15,
  },
  sleepHours: {
    // Risk increases for both too little and too much sleep
    // Optimal is 7-8 hours
    multiplier: 1.5, // Risk multiplier per hour deviation from optimal
  },
};

/**
 * Calculate the readmission risk score based on medical conditions
 * @param conditions Array of medical condition IDs
 * @returns Risk score from 0-100
 */
export function calculateRiskScoreFromConditions(conditions: string[] = []): number {
  if (!conditions || conditions.length === 0) {
    return 10; // Base risk score for healthy individuals
  }

  // Calculate risk from conditions
  let conditionRisk = 0;
  conditions.forEach(condition => {
    conditionRisk += CONDITION_RISK_WEIGHTS[condition] || 0;
  });

  // Cap the risk score at 100
  return Math.min(100, conditionRisk);
}

/**
 * Calculate the readmission risk score based on hospitalization history
 * @param hospitalizationData Object containing hospitalization history
 * @returns Risk score from 0-100
 */
export function calculateRiskScoreFromHospitalization(hospitalizationData: any = {}): number {
  let riskScore = 0;

  // Add risk for recent hospitalization
  if (hospitalizationData.recentHospitalization === "yes") {
    riskScore += HOSPITALIZATION_RISK_WEIGHTS.recentHospitalization;
    
    // Add risk based on number of admissions
    const admissionCount = parseInt(hospitalizationData.admissionCount) || 0;
    riskScore += admissionCount * HOSPITALIZATION_RISK_WEIGHTS.admissionCountMultiplier;
    
    // Add risk based on length of hospital stay
    const stayDays = parseInt(hospitalizationData.hospitalStayDays) || 0;
    riskScore += stayDays * HOSPITALIZATION_RISK_WEIGHTS.hospitalStayDaysMultiplier;
  }

  // Cap the risk score at 100
  return Math.min(100, riskScore);
}

/**
 * Calculate the readmission risk score based on lifestyle factors
 * @param lifestyleData Object containing lifestyle information
 * @returns Risk score from 0-100
 */
export function calculateRiskScoreFromLifestyle(lifestyleData: any = {}): number {
  let riskScore = 0;

  // Add risk from smoking status
  if (lifestyleData.smokingStatus) {
    riskScore += LIFESTYLE_RISK_WEIGHTS.smoking[lifestyleData.smokingStatus] || 0;
  }

  // Add risk from alcohol consumption
  if (lifestyleData.alcoholConsumption) {
    riskScore += LIFESTYLE_RISK_WEIGHTS.alcoholConsumption[lifestyleData.alcoholConsumption] || 0;
  }

  // Add risk from physical activity level
  if (lifestyleData.physicalActivity) {
    riskScore += LIFESTYLE_RISK_WEIGHTS.physicalActivity[lifestyleData.physicalActivity] || 0;
  }

  // Add risk from stress level
  if (lifestyleData.stressLevel) {
    riskScore += LIFESTYLE_RISK_WEIGHTS.stressLevel[lifestyleData.stressLevel] || 0;
  }

  // Add risk from sleep hours (deviation from optimal 7-8 hours)
  if (lifestyleData.sleepHours) {
    const sleepHours = parseFloat(lifestyleData.sleepHours);
    if (!isNaN(sleepHours)) {
      const optimalSleep = 7.5; // Optimal sleep is 7-8 hours
      const deviation = Math.abs(sleepHours - optimalSleep);
      riskScore += deviation * LIFESTYLE_RISK_WEIGHTS.sleepHours.multiplier;
    }
  }

  // Cap the risk score at 100
  return Math.min(100, riskScore);
}

/**
 * Calculate the overall readmission risk score
 * @param conditions Array of medical condition IDs
 * @param hospitalizationData Object containing hospitalization history
 * @param lifestyleData Object containing lifestyle information
 * @returns Risk score from 0-100
 */
export function calculateOverallRiskScore(
  conditions: string[] = [],
  hospitalizationData: any = {},
  lifestyleData: any = {}
): number {
  // Calculate individual risk scores
  const conditionRisk = calculateRiskScoreFromConditions(conditions);
  const hospitalizationRisk = calculateRiskScoreFromHospitalization(hospitalizationData);
  const lifestyleRisk = calculateRiskScoreFromLifestyle(lifestyleData);

  // Calculate weighted average (conditions have highest weight)
  const totalRisk = (conditionRisk * 0.5) + (hospitalizationRisk * 0.3) + (lifestyleRisk * 0.2);

  // Cap the risk score at 100
  return Math.min(100, Math.round(totalRisk));
}

/**
 * Get risk level description based on score
 * @param score Risk score from 0-100
 * @returns Object containing level and color
 */
export function getRiskLevel(score: number) {
  if (score < 30) return { level: "Low", color: "text-green-600", bgColor: "bg-green-100" };
  if (score < 60) return { level: "Moderate", color: "text-yellow-600", bgColor: "bg-yellow-100" };
  if (score < 80) return { level: "High", color: "text-orange-600", bgColor: "bg-orange-100" };
  return { level: "Very High", color: "text-red-600", bgColor: "bg-red-100" };
}

const conditions = ["diabetes", "asthma"];
const hospitalizationData = { recentHospitalization: "yes", admissionCount: 2, hospitalStayDays: 5 };
const lifestyleData = { smokingStatus: "current", alcoholConsumption: "frequent", physicalActivity: "sedentary", stressLevel: "high", sleepHours: 5 };

const calculatedRiskScore = calculateOverallRiskScore(
  conditions,
  hospitalizationData,
  lifestyleData
);
console.log("Test risk score:", calculatedRiskScore);

// Utility to calculate age from date string
function calculateAge(dateOfBirth?: string): string | number {
  if (!dateOfBirth) return "-";
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return "-";
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/**
 * Calculate the Health Stability Score based on patient data
 * @param patientData Object containing vitals, chronicConditions, medicationAdherence, labResults
 * @returns { score, tier, color, description }
 */
export function calculateHealthStabilityScore(patientData: {
  vitals?: { [key: string]: number | string },
  chronicConditions?: string[],
  medicationAdherence?: 'good' | 'average' | 'poor',
  labResults?: { [key: string]: number | string },
}): {
  score: number,
  tier: string,
  color: string,
  description: string
} {
  let score = 100;
  let riskFactorWeight = 10;
  let stabilityWeight = 5;
  let abnormalities = 0;
  let positives = 0;
  let reasons: string[] = [];

  // High-risk chronic conditions
  const highRiskConditions = [
    'diabetes', 'heart_disease', 'cancer', 'stroke', 'kidney_disease', 'copd', 'dementia', 'liver_disease', 'hypertension', 'asthma', 'arthritis', 'mental_health', 'other'
  ];
  if (Array.isArray(patientData.chronicConditions)) {
    patientData.chronicConditions.forEach(cond => {
      if (highRiskConditions.includes(cond)) {
        abnormalities++;
        reasons.push(`Chronic condition: ${cond.replace('_', ' ')}`);
      }
    });
  }

  // Vitals (example: blood pressure, heart rate)
  if (patientData.vitals) {
    if (patientData.vitals.bloodPressure) {
      // Assume format "120/80"
      const [sys, dia] = String(patientData.vitals.bloodPressure).split('/').map(Number);
      if (sys > 140 || dia > 90) {
        abnormalities++;
        reasons.push('Elevated blood pressure');
      } else if (sys >= 90 && sys <= 120 && dia >= 60 && dia <= 80) {
        positives++;
        reasons.push('Stable blood pressure');
      }
    }
    if (patientData.vitals.heartRate) {
      const hr = Number(patientData.vitals.heartRate);
      if (hr < 50 || hr > 100) {
        abnormalities++;
        reasons.push('Abnormal heart rate');
      } else {
        positives++;
        reasons.push('Stable heart rate');
      }
    }
  }

  // Medication adherence
  if (patientData.medicationAdherence) {
    if (patientData.medicationAdherence === 'good') {
      positives++;
      reasons.push('Good medication adherence');
    } else if (patientData.medicationAdherence === 'poor') {
      abnormalities++;
      reasons.push('Poor medication adherence');
    }
  }

  // Lab results (example: blood sugar, cholesterol)
  if (patientData.labResults) {
    if (patientData.labResults.bloodSugar) {
      const sugar = Number(patientData.labResults.bloodSugar);
      if (sugar > 180) {
        abnormalities++;
        reasons.push('Elevated blood sugar');
      } else if (sugar >= 70 && sugar <= 130) {
        positives++;
        reasons.push('Stable blood sugar');
      }
    }
    if (patientData.labResults.cholesterol) {
      const chol = Number(patientData.labResults.cholesterol);
      if (chol > 240) {
        abnormalities++;
        reasons.push('High cholesterol');
      } else if (chol < 200) {
        positives++;
        reasons.push('Healthy cholesterol');
      }
    }
  }

  // Weighted formula
  score = 100 - (riskFactorWeight * abnormalities) + (stabilityWeight * positives);
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Tier and color
  let tier = '';
  let color = '';
  if (score <= 30) {
    tier = 'Critical Stability';
    color = 'text-red-600';
  } else if (score <= 60) {
    tier = 'Moderate Stability';
    color = 'text-yellow-600';
  } else if (score <= 90) {
    tier = 'Good Stability';
    color = 'text-green-600';
  } else {
    tier = 'Excellent Stability';
    color = 'text-blue-600';
  }

  // Dynamic description
  let description = '';
  if (tier === 'Critical Stability') {
    description = `Your current health profile suggests critical stability due to: ${reasons.join(', ') || 'multiple high-risk factors'}.`;
  } else if (tier === 'Moderate Stability') {
    description = `Your current health profile suggests moderate stability${reasons.length ? ' due to: ' + reasons.join(', ') : ''}.`;
  } else if (tier === 'Good Stability') {
    description = `Your current health profile suggests good stability${reasons.length ? ' with: ' + reasons.join(', ') : ''}.`;
  } else {
    description = `Your current health profile suggests excellent stability. Keep up the good work!`;
  }

  return { score, tier, color, description };
} 