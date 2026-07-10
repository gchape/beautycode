package live.beautycode.backend.admin;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.ldap.odm.annotations.Attribute;
import org.springframework.ldap.odm.annotations.Entry;
import org.springframework.ldap.odm.annotations.Id;

import javax.naming.Name;

@Entry(
        base = "ou=admins",
        objectClasses = {"inetOrgPerson"}
)
@Getter
@Setter
@NoArgsConstructor
public class Admin {

    @Id
    private Name dn;

    @Attribute(name = "uid")
    private String uid;

    @Attribute(name = "cn")
    private String fullName;

    @Attribute(name = "givenName")
    private String firstName;

    @Attribute(name = "sn")
    private String lastName;

    @Attribute(name = "mail")
    private String email;

    @Attribute(name = "userPassword")
    private String password;
}
