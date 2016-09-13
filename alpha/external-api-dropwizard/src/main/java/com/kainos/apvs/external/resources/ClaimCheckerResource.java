package com.kainos.apvs.external.resources;

import com.kainos.apvs.external.api.Claim;
import com.kainos.apvs.external.api.ProcessingTypeResponse;
import com.kainos.apvs.external.services.IClaimCheckerService;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/check-for-automatic-processing")
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class ClaimCheckerResource {
    private IClaimCheckerService claimCheckerService;

    public ClaimCheckerResource(IClaimCheckerService claimCheckerService) {
        this.claimCheckerService = claimCheckerService;
    }

    @POST
    public ProcessingTypeResponse checkAutomaticProcessing(Claim claim) {
        ProcessingTypeResponse processingTypeResponse = claimCheckerService.checkClaim(claim);
        return processingTypeResponse;
    }
}
