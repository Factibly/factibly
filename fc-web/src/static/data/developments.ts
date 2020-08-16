import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

interface Development {
  tipText: string;
  url: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  contentText: string;
}

interface Developments {
  sourceCode: Development;
  uxFlowchart: Development;
  wireframes: Development;
  erd: Development;
  infraDiagram: Development;
}

const developments: Developments = {
  sourceCode: {
    tipText: "mission.techStack.sourceCode.toolTip.content",
    url: "https://github.com/Sapphire-Labs/Hackathon",
    Icon: GitHubIcon,
    contentText: "mission.techStack.sourceCode.title",
  },
  wireframes: {
    tipText: "mission.techStack.wireframes.toolTip.content",
    url: "https://www.figma.com/file/5yWNhxAPTHPdrHd0U5X2QE/FakeCheck-High-Fidelity-Wireframes-v1?node-id=0%3A1",
    Icon: PhotoLibraryIcon,
    contentText: "mission.techStack.wireframes.title",
  },
  uxFlowchart: {
    tipText: "mission.techStack.uxFlow.toolTip.content",
    url: "https://miro.com/app/board/o9J_kpJ4dHw=/",
    Icon: DescriptionIcon,
    contentText: "mission.techStack.uxFlow.title",
  },
  erd: {
    tipText: "mission.techStack.erd.toolTip.content",
    url: "https://app.lucidchart.com/invitations/accept/527e1e63-d836-49d4-8b2e-c389c2294a27",
    Icon: DescriptionIcon,
    contentText: "mission.techStack.erd.title",
  },
  infraDiagram: {
    tipText: "mission.techStack.infraDiagram.toolTip.content",
    url: "https://drive.google.com/file/d/1tL5VqGfF9K73nWqdyFTNIqNhhN7EQQF9/view?usp=sharing",
    Icon: DescriptionIcon,
    contentText: "mission.techStack.infraDiagram.title",
  },
};

export default developments;
