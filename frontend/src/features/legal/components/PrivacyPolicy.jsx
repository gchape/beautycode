const PrivacyPolicy = () => (
  <div className="mx-auto px-5 py-10 text-black bg-white font-serif">
    <h1 className="text-2xl font-bold mb-1">Privacy Notice</h1>
    <p className="text-sm text-gray-500 mb-8">Last updated: March 29, 2026</p>

    <p className="text-sm leading-relaxed mb-4">
      This Privacy Notice for <strong>BeautyCode</strong> ("we," "us," or
      "our"), describes how and why we might access, collect, store, use, and/or
      share ("process") your personal information when you use our services
      ("Services"), including when you visit our website at{" "}
      <a href="https://www.beauty-code.ge/" className="underline">
        beauty-code.ge
      </a>
      .
    </p>
    <p className="text-sm leading-relaxed mb-8">
      <strong>Questions or concerns?</strong> Reading this Privacy Notice will
      help you understand your privacy rights and choices. We are responsible
      for making decisions about how your personal information is processed. If
      you do not agree with our policies and practices, please do not use our
      Services.
    </p>

    {/* Summary */}
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-3">Summary of Key Points</h2>
      <p className="text-sm leading-relaxed italic mb-4">
        This summary provides key points from our Privacy Notice, but you can
        find out more details about any of these topics by using the table of
        contents below to find the section you are looking for.
      </p>

      <p className="text-sm leading-relaxed mb-3">
        <strong>What personal information do we process?</strong> When you
        visit, use, or navigate our Services, we may process personal
        information depending on how you interact with us and the Services, the
        choices you make, and the products and features you use.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        <strong>Do we process any sensitive personal information?</strong> Some
        of the information may be considered "special" or "sensitive" in certain
        jurisdictions, for example your racial or ethnic origins, sexual
        orientation, and religious beliefs. We do not process sensitive personal
        information.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        <strong>Do we collect any information from third parties?</strong> We
        may collect information from public databases, marketing partners,
        social media platforms, and other outside sources.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        <strong>How do we process your information?</strong> We process your
        information to provide, improve, and administer our Services,
        communicate with you, for security and fraud prevention, and to comply
        with law. We may also process your information for other purposes with
        your consent. We process your information only when we have a valid
        legal reason to do so.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        <strong>
          In what situations and with which parties do we share personal
          information?
        </strong>{" "}
        We may share information in specific situations and with specific third
        parties.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        <strong>What are your rights?</strong> Depending on where you are
        located geographically, the applicable privacy law may mean you have
        certain rights regarding your personal information.
      </p>
      <p className="text-sm leading-relaxed">
        <strong>How do you exercise your rights?</strong> The easiest way to
        exercise your rights is by submitting a data subject access request, or
        by contacting us. We will consider and act upon any request in
        accordance with applicable data protection laws.
      </p>
    </div>

    {/* Table of Contents */}
    <div className="mb-8">
      <h2 className="text-base font-bold mb-3">Table of Contents</h2>
      <ol className="text-sm space-y-1 list-decimal pl-5">
        {[
          "What Information Do We Collect?",
          "How Do We Process Your Information?",
          "When and With Whom Do We Share Your Personal Information?",
          "Do We Use Cookies and Other Tracking Technologies?",
          "How Do We Handle Your Social Logins?",
          "Is Your Information Transferred Internationally?",
          "How Long Do We Keep Your Information?",
          "Do We Collect Information from Minors?",
          "What Are Your Privacy Rights?",
          "Controls for Do-Not-Track Features",
          "Do We Make Updates to This Notice?",
          "How Can You Contact Us About This Notice?",
          "How Can You Review, Update, or Delete the Data We Collect From You?",
        ].map((item, i) => (
          <li key={i} className="underline cursor-pointer">
            {item}
          </li>
        ))}
      </ol>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        1. What Information Do We Collect?
      </h2>
      <p className="text-sm font-semibold mt-4 mb-1">
        Personal information you disclose to us
      </p>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: We collect personal information that you provide to us.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        We collect personal information that you voluntarily provide to us when
        you register on the Services, express an interest in obtaining
        information about us or our products and Services, when you participate
        in activities on the Services, or otherwise when you contact us.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        <strong>Sensitive Information.</strong> We do not process sensitive
        information.
      </p>
      <p className="text-sm leading-relaxed">
        All personal information that you provide to us must be true, complete,
        and accurate, and you must notify us of any changes to such personal
        information.
      </p>

      <p className="text-sm font-semibold mt-4 mb-1">
        Information automatically collected
      </p>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: Some information — such as your Internet Protocol (IP) address
        and/or browser and device characteristics — is collected automatically
        when you visit our Services.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        We automatically collect certain information when you visit, use, or
        navigate the Services. This information does not reveal your specific
        identity (like your name or contact information) but may include device
        and usage information, such as your IP address, browser and device
        characteristics, operating system, language preferences, referring URLs,
        device name, country, location, information about how and when you use
        our Services, and other technical information. This information is
        primarily needed to maintain the security and operation of our Services,
        and for our internal analytics and reporting purposes.
      </p>
      <p className="text-sm leading-relaxed">
        Like many businesses, we also collect information through cookies and
        similar technologies.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        2. How Do We Process Your Information?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: We process your information to provide, improve, and
        administer our Services, communicate with you, for security and fraud
        prevention, and to comply with law. We may also process your information
        for other purposes with your consent.
      </p>
      <p className="text-sm leading-relaxed">
        We process your personal information for a variety of reasons, depending
        on how you interact with our Services.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        3. When and With Whom Do We Share Your Personal Information?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: We may share information in specific situations described in
        this section and/or with the following third parties.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        We may need to share your personal information in the following
        situations:
      </p>
      <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
        <li>
          <strong>Business Transfers.</strong> We may share or transfer your
          information in connection with, or during negotiations of, any merger,
          sale of company assets, financing, or acquisition of all or a portion
          of our business to another company.
        </li>
        <li>
          <strong>Affiliates.</strong> We may share your information with our
          affiliates, in which case we will require those affiliates to honor
          this Privacy Notice. Affiliates include our parent company and any
          subsidiaries, joint venture partners, or other companies that we
          control or that are under common control with us.
        </li>
        <li>
          <strong>Business Partners.</strong> We may share your information with
          our business partners to offer you certain products, services, or
          promotions.
        </li>
      </ul>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        4. Do We Use Cookies and Other Tracking Technologies?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: We may use cookies and other tracking technologies to collect
        and store your information.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        We may use cookies and similar tracking technologies (like web beacons
        and pixels) to gather information when you interact with our Services.
        Some online tracking technologies help us maintain the security of our
        Services, prevent crashes, fix bugs, save your preferences, and assist
        with basic site functions.
      </p>
      <p className="text-sm leading-relaxed">
        Specific information about how we use such technologies and how you can
        refuse certain cookies is set out in our Cookie Notice.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        5. How Do We Handle Your Social Logins?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: If you choose to register or log in to our Services using a
        social media account, we may have access to certain information about
        you.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        Our Services offer you the ability to register and log in using your
        third-party social media account details (like your Facebook or X
        logins). Where you choose to do this, we will receive certain profile
        information about you from your social media provider. The profile
        information we receive may vary depending on the social media provider
        concerned, but will often include your name, email address, friends
        list, and profile picture, as well as other information you choose to
        make public on such a social media platform.
      </p>
      <p className="text-sm leading-relaxed">
        We will use the information we receive only for the purposes that are
        described in this Privacy Notice or that are otherwise made clear to you
        on the relevant Services. Please note that we do not control, and are
        not responsible for, other uses of your personal information by your
        third-party social media provider. We recommend that you review their
        privacy notice to understand how they collect, use, and share your
        personal information.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        6. Is Your Information Transferred Internationally?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: We may transfer, store, and process your information in
        countries other than your own.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        Our servers are located in Georgia. Regardless of your location, please
        be aware that your information may be transferred to, stored by, and
        processed by us in our facilities and in the facilities of the third
        parties with whom we may share your personal information.
      </p>
      <p className="text-sm leading-relaxed">
        If you are a resident in the European Economic Area (EEA), United
        Kingdom (UK), or Switzerland, then these countries may not necessarily
        have data protection laws or other similar laws as comprehensive as
        those in your country. However, we will take all necessary measures to
        protect your personal information in accordance with this Privacy Notice
        and applicable law.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        7. How Long Do We Keep Your Information?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: We keep your information for as long as necessary to fulfill
        the purposes outlined in this Privacy Notice unless otherwise required
        by law.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        We will only keep your personal information for as long as it is
        necessary for the purposes set out in this Privacy Notice, unless a
        longer retention period is required or permitted by law (such as tax,
        accounting, or other legal requirements).
      </p>
      <p className="text-sm leading-relaxed">
        When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize such
        information, or, if this is not possible (for example, because your
        personal information has been stored in backup archives), then we will
        securely store your personal information and isolate it from any further
        processing until deletion is possible.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        8. Do We Collect Information from Minors?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: We do not knowingly collect data from or market to children
        under 18 years of age.
      </p>
      <p className="text-sm leading-relaxed">
        We do not knowingly collect, solicit data from, or market to children
        under 18 years of age, nor do we knowingly sell such personal
        information. By using the Services, you represent that you are at least
        18 or that you are the parent or guardian of such a minor and consent to
        such minor dependent's use of the Services. If we learn that personal
        information from users less than 18 years of age has been collected, we
        will deactivate the account and take reasonable measures to promptly
        delete such data from our records. If you become aware of any data we
        may have collected from children under age 18, please contact us at{" "}
        <a href="mailto:13beauty.code@gmail.com" className="underline">
          13beauty.code@gmail.com
        </a>
        .
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        9. What Are Your Privacy Rights?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: You may review, change, or terminate your account at any time,
        depending on your country, province, or state of residence.
      </p>
      <p className="text-sm font-semibold mt-4 mb-1">
        Withdrawing your consent:
      </p>
      <p className="text-sm leading-relaxed mb-3">
        If we are relying on your consent to process your personal information,
        which may be express and/or implied consent depending on the applicable
        law, you have the right to withdraw your consent at any time. You can
        withdraw your consent at any time by contacting us using the contact
        details provided in the section "How Can You Contact Us About This
        Notice?" below.
      </p>
      <p className="text-sm leading-relaxed mb-3">
        However, please note that this will not affect the lawfulness of the
        processing before its withdrawal nor, when applicable law allows, will
        it affect the processing of your personal information conducted in
        reliance on lawful processing grounds other than consent.
      </p>
      <p className="text-sm font-semibold mt-4 mb-1">Account Information</p>
      <p className="text-sm leading-relaxed mb-3">
        If you would at any time like to review or change the information in
        your account or terminate your account, you may contact us.
      </p>
      <p className="text-sm leading-relaxed">
        Upon your request to terminate your account, we will deactivate or
        delete your account and information from our active databases. However,
        we may retain some information in our files to prevent fraud,
        troubleshoot problems, assist with any investigations, enforce our legal
        terms and/or comply with applicable legal requirements.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        10. Controls for Do-Not-Track Features
      </h2>
      <p className="text-sm leading-relaxed">
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track ("DNT") feature or setting you can
        activate to signal your privacy preference not to have data about your
        online browsing activities monitored and collected. At this stage, no
        uniform technology standard for recognizing and implementing DNT signals
        has been finalized. As such, we do not currently respond to DNT browser
        signals or any other mechanism that automatically communicates your
        choice not to be tracked online. If a standard for online tracking is
        adopted that we must follow in the future, we will inform you about that
        practice in a revised version of this Privacy Notice.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        11. Do We Make Updates to This Notice?
      </h2>
      <p className="text-sm leading-relaxed italic mb-2">
        In Short: Yes, we will update this notice as necessary to stay compliant
        with relevant laws.
      </p>
      <p className="text-sm leading-relaxed">
        We may update this Privacy Notice from time to time. The updated version
        will be indicated by an updated "Revised" date at the top of this
        Privacy Notice. If we make material changes to this Privacy Notice, we
        may notify you either by prominently posting a notice of such changes or
        by directly sending you a notification. We encourage you to review this
        Privacy Notice frequently to be informed of how we are protecting your
        information.
      </p>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        12. How Can You Contact Us About This Notice?
      </h2>
      <p className="text-sm leading-relaxed mb-3">
        If you have questions or comments about this notice, you may contact us
        at:
      </p>
      <div className="text-sm leading-loose">
        <p>
          <strong>BeautyCode</strong>
        </p>
        <p>Vazha Pshavela avenue, 21, Tbilisi, 0144, Georgia</p>
        <p>
          Phone:{" "}
          <a href="tel:+995574074833" className="underline">
            +995 574 074 833
          </a>
        </p>
        <p>
          Email:{" "}
          <a href="mailto:13beauty.code@gmail.com" className="underline">
            13beauty.code@gmail.com
          </a>
        </p>
        <p>
          Web:{" "}
          <a href="https://www.beauty-code.ge/" className="underline">
            beauty-code.ge
          </a>
        </p>
      </div>
    </div>

    <div className="mb-7">
      <h2 className="text-base font-bold mb-2">
        13. How Can You Review, Update, or Delete the Data We Collect From You?
      </h2>
      <p className="text-sm leading-relaxed">
        Based on the applicable laws of your country, you may have the right to
        request access to the personal information we collect from you, details
        about how we have processed it, correct inaccuracies, or delete your
        personal information. You may also have the right to withdraw your
        consent to our processing of your personal information. These rights may
        be limited in some circumstances by applicable law. To request to
        review, update, or delete your personal information, please fill out and
        submit a data subject access request.
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
