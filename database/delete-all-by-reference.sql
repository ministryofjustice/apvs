DECLARE @deleteReference char(10);
SET @deleteReference = 'REFXXXX';

DELETE FROM IntSchema.Task WHERE Reference=@deleteReference;
DELETE FROM IntSchema.ClaimEvent WHERE Reference=@deleteReference;
DELETE FROM IntSchema.ClaimBankDetail WHERE Reference=@deleteReference;
DELETE FROM IntSchema.ClaimDocument WHERE Reference=@deleteReference;
DELETE FROM IntSchema.ClaimExpense WHERE Reference=@deleteReference;
DELETE FROM IntSchema.ClaimEscort WHERE Reference=@deleteReference;
DELETE FROM IntSchema.ClaimChild WHERE Reference=@deleteReference;
DELETE FROM IntSchema.ClaimDeduction WHERE Reference=@deleteReference;
DELETE FROM IntSchema.Claim WHERE Reference=@deleteReference;
DELETE FROM IntSchema.Visitor WHERE Reference=@deleteReference;
DELETE FROM IntSchema.Prisoner WHERE Reference=@deleteReference;
DELETE FROM IntSchema.Eligibility WHERE Reference=@deleteReference;

DELETE FROM ExtSchema.Task WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.EligibilityVisitorUpdateContactDetail WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.ClaimBankDetail WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.ClaimDocument WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.ClaimExpense WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.ClaimEscort WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.ClaimChild WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.Claim WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.Visitor WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.Prisoner WHERE Reference=@deleteReference;
DELETE FROM ExtSchema.Eligibility WHERE Reference=@deleteReference;